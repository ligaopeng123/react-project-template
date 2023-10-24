import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../../utils/index.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter/cupertino.dart';
import 'dart:convert';
import '../../../../config/app_config.dart';
import '../../../../utils/color/color_hex.dart';
import '../../login_service.dart' show postCaptcha;
import '../../login.m.dart' show LoginMobileCaptcha;

/// 输出框风格类型
enum InputType {
  /// 普通类型
  normal,

  /// 可关闭类型
  close,
  // 验证码
  captcha,
  // 图片验证码
  captchaImage,
  // 密码框
  password,
  // 服务器地址
  serverIp,
  // 自定义
  custom,
}

class CustomInput extends StatefulWidget {
  const CustomInput({
    Key? key,
    this.controller,
    this.inputFormatters,
    this.hintText,
    this.autofocus = false,
    this.onChanged,
    this.rightCustom,
    this.keyboardType,
    this.inputType = InputType.normal,
    this.margin,
    this.onTapCaptcha,
  }) : super(key: key);

  /// 文本controller类，如果传入需要手动销毁
  final TextEditingController? controller;

  /// 输入框类型
  final InputType inputType;

  /// 提示内容
  final String? hintText;

  /// 验证规则
  final List<TextInputFormatter>? inputFormatters;

  /// 是否自动聚集光标
  final bool? autofocus;

  /// 右侧自定义组件
  final Widget? rightCustom;

  /// 验证码点击事件
  final Future<bool> Function(int value)? onTapCaptcha;

  /// 输入框内容改变后事件
  final void Function(String value)? onChanged;

  /// 键盘弹起类型，默认纯数字
  final TextInputType? keyboardType;

  /// 外层边距距离
  final EdgeInsetsGeometry? margin;

  @override
  State<CustomInput> createState() => CustomInputState();
}

class CustomInputState extends State<CustomInput> {
  TextEditingController? _controller;
  double baseTextSize = 32.sp;
  Color desTextColor = const Color(0xFFB4B9C6);
  String captchaText = '获取验证码';
  bool changeFlag = false; // 是否正在变动中
  Timer? _timer; // 定时对象
  final FocusNode _focusNode = FocusNode(); // 光标
  bool isFocus = false; // 是否聚集
  bool obscureText = false; // 是否密码可见
  // 验证码图片
  LoginMobileCaptcha captchaImageObj =
      LoginMobileCaptcha(image: '', imageId: '');

  @override
  void initState() {
    super.initState();
    _controller = widget.controller ?? TextEditingController();
    _focusNode.addListener(() {
      setState(() {
        isFocus = _focusNode.hasFocus;
      });
    });
    if (InputType.password == widget.inputType) {
      obscureText = true;
    }

    if (InputType.captchaImage == widget.inputType) {
      getCurrentCaptchaImage();
    }
  }

  void getCurrentCaptchaImage() async {
    final serverIp = await AppConfig.serverIp();
    if (isTextEmpty(serverIp)) {
      return;
    }
    postCaptcha().then((res) {
      setState(() {
        captchaImageObj = res;
      });
    });
  }

  @override
  void dispose() {
    if (_timer != null) _timer?.cancel();
    if (widget.controller == null) _controller?.dispose();
    super.dispose();
  }

  /**
   * 获取当前的值
   */
  getValue() {
    if (InputType.captchaImage == widget.inputType) {
      getCurrentCaptchaImage();
      var currentVal = captchaImageObj;
      currentVal.inputCode = _controller?.text;
      return currentVal;
    }
    if (widget.controller != null) {
      return _controller?.text;
    }
    return null;
  }

  // 动态验证
  List<TextInputFormatter> dyFormatters() {
    List<TextInputFormatter> formmatterList = [];
    switch (widget.inputType) {
      case InputType.captcha:
        formmatterList.addAll([
          FilteringTextInputFormatter.digitsOnly,
          LengthLimitingTextInputFormatter(6),
        ]);
        break;
      default:
        formmatterList.addAll([
          FilteringTextInputFormatter.digitsOnly,
          LengthLimitingTextInputFormatter(11), // 限制长度
        ]);
    }
    return formmatterList;
  }

  /**
   * 非空验证
   */
  List<TextInputFormatter> defaultFormatters() {
    List<TextInputFormatter> formmatterList = [];
    return formmatterList;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 24.w),
      margin: widget.margin,
      decoration: BoxDecoration(
        color: const Color(0x00FFFFFF),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: HexColor('#D8E0F0'), //
          width: 1,
        ),
      ),
      child: Stack(
        children: [
          TextField(
            controller: _controller,
            focusNode: _focusNode,
            autofocus: widget.autofocus!,
            keyboardType: widget.keyboardType,
            // 默认键盘类型
            // 是否可见
            obscureText: obscureText,
            inputFormatters: widget.inputFormatters ?? defaultFormatters(),
            decoration: InputDecoration(
              hintText: widget.hintText ?? '',
              hintStyle: TextStyle(
                fontSize: baseTextSize,
                color: desTextColor,
              ),
              // 底部边框线
              border: InputBorder.none,
              focusedBorder: InputBorder.none,
              focusedErrorBorder: InputBorder.none,
              enabledBorder: InputBorder.none,
            ),
            onChanged: (value) {
              if (widget.onChanged != null) {
                widget.onChanged!(value);
              }
            },
          ),
          // 右侧扩展区
          rightFixedWidget(),
        ],
      ),
    );
  }

  // 右侧固定组件
  Widget rightFixedWidget() {
    Widget fixedChild = Container();
    switch (widget.inputType) {
      case InputType.captcha:
        fixedChild = Positioned(
          right: 0,
          top: 14,
          child: GestureDetector(
            onTap: onTapCaptcha,
            child: Text(
              captchaText,
              style: TextStyle(
                // 是否灰色
                color: changeFlag ? const Color(0xFFC4C7CD) : Colors.blue,
                fontSize: baseTextSize,
              ),
            ),
          ),
        );
        break;
      case InputType.captchaImage:
        fixedChild = Positioned(
            right: 0,
            top: 5,
            child: GestureDetector(
                onTap: () {
                  getCurrentCaptchaImage();
                },
                child: !checkTextEmpty(captchaImageObj.image)
                    ? Image.memory(
                        Base64Decoder().convert(
                            (captchaImageObj.image ?? '').split(',')[1]),
                        gaplessPlayback: true,
                      )
                    : Container(
                        padding: const EdgeInsets.only(left: 0, top: 10),
                        child: Icon(CupertinoIcons.arrow_clockwise,
                            size: 36.sp))));
        break;
      // 关闭icon组件，聚集时显示
      case InputType.password:
        fixedChild = Positioned(
          right: 0,
          top: 15,
          child: GestureDetector(
              onTap: () {
                setState(() {
                  obscureText = !obscureText;
                });
              },
              child: Icon(
                  obscureText == true
                      ? CupertinoIcons.eye_slash_fill
                      : CupertinoIcons.eye_fill,
                  size: 36.sp)),
        );
        break;
      case InputType.serverIp:
        fixedChild = Positioned(
          right: 0,
          top: 15,
          child: GestureDetector(
              onTap: () {
                setState(() {
                  obscureText = !obscureText;
                });
              },
              child: Icon(
                  obscureText == true
                      ? CupertinoIcons.eye_slash_fill
                      : CupertinoIcons.eye_fill,
                  size: 36.sp)),
        );
        break;
      default:
    }
    return fixedChild;
  }

  // 验证码事件
  void onTapCaptcha() async {
    if (changeFlag) return;
    int seconds = 59;
    if (widget.onTapCaptcha != null) {
      bool flag = await widget.onTapCaptcha!(seconds);
      // 外层控制是否执行
      if (flag) return;
    }
    setState(() {
      changeFlag = true;
      captchaText = '重新发送 ${seconds}s';
    });

    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      seconds--;
      setState(() {
        captchaText = '重新发送 ${seconds}s';
      });
      // 结束
      if (seconds <= 0) {
        timer.cancel();
        setState(() {
          changeFlag = false;
          captchaText = '获取验证码';
        });
      }
    });
  }
}
