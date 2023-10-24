import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../utils/tool/water_mark.dart';

import '../../routes/route_name.dart';

// 错误页面
class ErrorPage extends StatefulWidget {
  const ErrorPage({Key? key, this.params, this.title, this.errorText})
      : super(key: key);
  final dynamic params;

  /// 页面标题
  final String? title;

  /// 页面内容
  final String? errorText;

  @override
  State<ErrorPage> createState() => _ErrorPageState();
}

class _ErrorPageState extends State<ErrorPage> {
  @override
  Widget build(BuildContext context) {
    buildWhiteWatermark(context);
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title ?? 'Error'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(10),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Center(
              child: Icon(Icons.error, color: Colors.red, size: 66),
            ),
            SelectableText(
              widget.errorText ?? '内容走丢了',
              style: const TextStyle(fontSize: 22),
            ),
            TextButton(
              style: ButtonStyle(
                padding: MaterialStateProperty.all<EdgeInsets>(
                  EdgeInsets.symmetric(horizontal: 32.h, vertical: 16.w),
                ),
              ),
              onPressed: () {
                Navigator.pushReplacementNamed(context, RouteName.appMain);
              },
              child: Text('点击返回首页'),
            ),
          ],
        ),
      ),
    );
  }
}
