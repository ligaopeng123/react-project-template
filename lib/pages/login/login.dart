import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../routes/route_name.dart';
import 'components/custom_checkbox/custom_checkbox.dart';
import 'components/custom_input/custom_input.dart';
import 'components/custom_input/server_ip.dart';
import './user_util.dart' show UserUtil;
import '../../utils/tool/tips_util.dart';
import '../../utils/index.dart' show encode, checkTextEmpty;
import './login_service.dart' show postLogin;
import './login.m.dart' show LoginMobileData;
import 'components/user_agreement.dart';

GlobalKey<ServerIpState> serverIpKey = GlobalKey();
GlobalKey<CustomInputState> captchaKey = GlobalKey();

class Login extends StatefulWidget {
  const Login({Key? key, this.params}) : super(key: key);
  final dynamic params;

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  FocusNode blankNode = FocusNode(); // 响应空白处的焦点的Node
  final double baseTextSize = 32.sp; // 输入框文字
  final double _slaSize = 26.sp; // 协议文字大小
  Color desTextColor = const Color(0xFFB4B9C6);
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  final _captchaController = TextEditingController();
  Color btnDisableColor = const Color(0xffAFD1FC); // 禁用按钮颜色
  bool isSelected = false; // 协议勾选
  final String loginBg = 'asset/images/login/login_bg.png'; // 背景图片
  num accountType = 0; // 账号类型 默认主账号

  @override
  void initState() {
    super.initState();
    initData();
  }

  setSelected(val) {
    setState(() {
      isSelected = val;
    });
  }

  @override
  void dispose() {
    _phoneController.dispose();
    _passwordController.dispose();
    _captchaController.dispose();
    FocusScope.of(context).requestFocus(blankNode);
    super.dispose();
  }

  Future<void> initData() async {
    LoginMobileData userInfo = await UserUtil.getUserInfo();
    if (userInfo.username?.isNotEmpty ?? false) {
      _phoneController.text = userInfo.username!;
      setState(() {
        isSelected = true;
      });
    }
  }

  // 是否输入用户名
  bool hasUserName() {
    if (!checkTextEmpty(_phoneController.text)) return true;
    Tips.info('请输入用户名');
    return false;
  }

  bool hasPassword() {
    if (!checkTextEmpty(_passwordController.text)) return true;
    Tips.info('请输入密码');
    return false;
  }

  // 登入按钮
  login() async {
    if (!hasUserName()) return;
    if (!hasPassword()) return;
    // 验证码点击
    final captchaVal = await captchaKey.currentState?.getValue();
    if (checkTextEmpty(captchaVal.inputCode)) {
      Tips.info('请输入验证码');
      return;
    }
    // 服务器配置
    final serverIp = serverIpKey.currentState?.getServerIp();
    if (checkTextEmpty(serverIp)) {
      Tips.info('请输入服务器配置');
      return;
    }
    /**
     * 用户协议
     */
    FocusScope.of(context).requestFocus(blankNode);
    if (!isSelected) return Tips.info('请确认已阅读并同意用户协议');
    /**
     * 参数处理
     */
    Map<String, dynamic> mainAccount = accountType == 1
        ? {
            'mainAccount': _phoneController.text?.split('@')[1],
            'username': _phoneController.text?.split('@')[0]
          }
        : {};

    final password = await encode(_passwordController.text);
    Map<String, dynamic> params = {
      'username': _phoneController.text,
      'password': password,
      'inputCode': captchaVal.inputCode,
      'imageId': captchaVal.imageId,
      'accountType': accountType
    };

    params.addAll(mainAccount);
    /**
     * 数据下发
     */
    final loginData = await postLogin(params);
    if (loginData == null) {
      return;
    }
    /**
     * 426密码过期
     */
    if (loginData.code == 200 || loginData.code == 426) {
      /**
       * 数据存储
       */
      // 成功后，回退上一页
      // TODO: 登录请求处理 登录成功后需要缓存下数据  SpUtil
      final userData = loginData.data;
      // 数据存储
      await UserUtil.saveUserInfo(LoginMobileData(
        access_token: userData?.access_token,
        tenant: userData?.tenant,
        userId: userData?.userId,
        phone: userData?.phone,
        username: userData?.username,
        email: userData?.email,
        realName: userData?.realName,
        tenantName: userData?.tenantName,
        orgName: userData?.orgName,
        orgCode: userData?.orgCode,
        orgId: userData?.orgId,
        roleId: userData?.roleId,
        roleHighestLevel: userData?.roleHighestLevel,
        accountType: userData?.accountType,
        mainAccount: userData?.mainAccount,
      ));
      Navigator.pushNamed(context, RouteName.appMain);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GestureDetector(
        onTap: () {
          // 点击空白页面关闭键盘
          FocusScope.of(context).requestFocus(blankNode);
        },
        child: loginLayout(),
      ),
    );
  }

  Widget loginLayout() {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 48.w),
      decoration: BoxDecoration(
        image: DecorationImage(
          image: ExactAssetImage(loginBg),
          fit: BoxFit.cover, // 完全填充
        ),
      ),
      child: ListView(
        children: [
          navWidget(),
          tabWidget(),
          CustomInput(
            margin: EdgeInsets.only(bottom: 23.w),
            controller: _phoneController,
            autofocus: true,
            hintText: accountType == 1 ? '子账号@主账号，例如：zhangshan@admin' : '请输入账号',
            inputType: InputType.close,
          ),
          CustomInput(
            margin: EdgeInsets.only(bottom: 23.w),
            controller: _passwordController,
            autofocus: true,
            hintText: '请输入密码',
            inputType: InputType.password,
          ),
          CustomInput(
            key: captchaKey,
            controller: _captchaController,
            hintText: '请输入验证码',
            inputType: InputType.captchaImage,
          ),
          ipTitle(),
          ipInput(),
          bottomBtn(),
          slaText(),
        ],
      ),
    );
  }

  // 头部标题
  Widget navWidget() {
    return Container(
      alignment: Alignment.centerLeft,
      padding: EdgeInsets.symmetric(vertical: 32.w),
      child: Column(
        children: [
          Text(
            '您好，\n欢迎来到智慧管理APP！',
            textAlign: TextAlign.left,
            style: TextStyle(fontSize: 48.sp, fontWeight: FontWeight.w600),
          ),
        ],
      ),
    );
  }

  /**
   * 切换能力
   */
  Widget tabWidget() {
    return Container(
      alignment: Alignment.centerLeft,
      padding: EdgeInsets.symmetric(vertical: 32.w),
      child: Row(
        children: [
          const SizedBox(height: 30),
          CupertinoButton(
            onPressed: () {
              setState(() {
                accountType = 0;
              });
            },
            child: Text('主账号登录',
                style: accountType == 0
                    ? TextStyle(fontWeight: FontWeight.w600)
                    : TextStyle(
                        fontWeight: FontWeight.w600, color: Color(0xFF000000))),
          ),
          CupertinoButton(
            onPressed: () {
              setState(() {
                accountType = 1;
              });
            },
            child: Text('子账号登录',
                style: accountType == 1
                    ? TextStyle(fontWeight: FontWeight.w600)
                    : TextStyle(
                        fontWeight: FontWeight.w600, color: Color(0xFF000000))),
          ),
        ],
      ),
    );
  }

  // ip组件
  Widget ipTitle() {
    return Container(
      alignment: Alignment.centerLeft,
      padding: EdgeInsets.only(top: 32.w, bottom: 0.w),
      child: Column(
        children: [
          Text(
            '服务器配置：',
            style: TextStyle(fontSize: 32.sp, fontWeight: FontWeight.w600),
          )
        ],
      ),
    );
  }

  Widget ipInput() {
    return Container(
        alignment: Alignment.centerLeft,
        padding: EdgeInsets.only(top: 16.w, bottom: 16.w),
        child: ServerIpExample(key: serverIpKey));
  }

  // 底部组件
  Widget bottomBtn() {
    return Container(
      margin: EdgeInsets.only(top: 32.w, bottom: 32.w),
      child: CupertinoButton.filled(
        child: const Text('登录'),
        onPressed: login,
      ),
    );
  }

  // 协议文字
  Widget slaText() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          margin: const EdgeInsets.only(right: 5),
          child: CustomCheckbox(
            value: isSelected,
            onChanged: (value) {
              setState(() {
                isSelected = !value;
              });
            },
            radius: 22,
            size: 32.sp,
          ),
        ),
        RichText(
          textAlign: TextAlign.center,
          text: TextSpan(
            style: TextStyle(
              color: const Color(0xFFB4B9C6),
              fontSize: _slaSize,
            ),
            text: '已阅读并接受',
            children: [
              WidgetSpan(
                child: UserAgreement(isSelected: isSelected, setSelected: setSelected),
              ),
              // const TextSpan(text: '和'),
              // WidgetSpan(
              //   child: Text(
              //     '《隐私政策》',
              //     style: TextStyle(fontSize: _slaSize),
              //   ),
              // ),
            ],
          ),
        ),
      ],
    );
  }
}
