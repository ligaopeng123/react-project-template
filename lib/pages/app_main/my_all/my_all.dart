import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:smart_iot_app/utils/color/color_hex.dart';
import '../../../config/app_config.dart';
import 'package:flutter/cupertino.dart';
import '../../login/user_util.dart' show UserUtil;
import './components/my_all_list.dart';

class My_all extends StatefulWidget {
  My_all({Key? key}) : super(key: key);

  @override
  _My_allState createState() => _My_allState();
}

class _My_allState extends State<My_all> {
  @override
  void initState() {
    super.initState();
    initData();
  }

  final String name_bg = 'asset/images/login/name_bg.png'; // 背景图片
  final String avatar = 'asset/images/login/avatar.png'; // 背景图片
  final double toolbarHeight = kIsWeb ? ScreenUtil().setHeight(252) : 160;
  String userText = '';
  String ipText = '';
  final sizedBoxSpace = SizedBox(height: 4);

  Future<void> initData() async {
    final userData = await UserUtil?.getUserInfo();
    final baseUrl = await AppConfig.serverIp();
    setState(() {
      final realName = userData.realName ?? '';
      userText = realName ?? '';
      ipText = baseUrl ?? '';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          toolbarHeight: toolbarHeight,
          automaticallyImplyLeading: false,
          backgroundColor: Colors.transparent,
          title: _title(),
          elevation: 0,
          leadingWidth: MediaQuery.of(context).size.width,
          flexibleSpace: _flexibleSpace()),
      body: Container(
          color: hexToColor('#F4F7FA'),
          padding: EdgeInsets.only(left: 12, right: 12, top: 12, bottom: 12),
          // #F4F7FA
          child: Card(
            elevation: 0.0,
            color: Colors.transparent,
            child: MyAllList(),
          )),
    );
  }

  Widget _title() {
    return Container(
      height: toolbarHeight,
      width: MediaQuery.of(context).size.width,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: <Widget>[
          Container(
            margin: const EdgeInsets.only(top: 12),
            child: Text(
              '我的',
              style: TextStyle(color: Colors.white),
            ),
          ),
          Container(
            margin: EdgeInsets.only(top: 48.h),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Image(
                  image: AssetImage(avatar),
                  width: 120.w,
                ),
                Expanded(
                    flex: 4,
                    child: Container(
                      margin: const EdgeInsets.only(left: 16),
                      child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Text(
                              userText,
                              textAlign: TextAlign.left,
                              style: TextStyle(
                                  color: Colors.white, fontSize: 48.sp),
                            ),
                            sizedBoxSpace,
                            Text(
                              ipText,
                              textAlign: TextAlign.left,
                              softWrap: true,
                              style: TextStyle(
                                  color: Colors.white, fontSize: 36.sp),
                            ),
                          ]),
                    ))
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _flexibleSpace() {
    return SizedBox(
      height: kIsWeb
          ? toolbarHeight
          : toolbarHeight + MediaQuery.of(context).padding.top,
      width: double.infinity,
      child: Image.asset(
        name_bg,
        fit: BoxFit.cover,
      ),
    );
  }
}
