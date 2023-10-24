import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

///  Created by pgli on 2023/4/19.
class AppBarTitle extends StatefulWidget {
  AppBarTitle({Key? key, this.title}) : super(key: key);

  /// 表头
  final String? title;

  @override
  _AppBarTitleState createState() => _AppBarTitleState();
}

final AppBarTitleStyle = TextStyle(fontSize: 36.sp, fontWeight: FontWeight.bold);

class _AppBarTitleState extends State<AppBarTitle> {
  @override
  Widget build(BuildContext context) {
    return Text(
      widget.title ?? '',
      style: TextStyle(fontSize: 36.sp, fontWeight: FontWeight.bold),
      textAlign: TextAlign.center,
    );
  }
}