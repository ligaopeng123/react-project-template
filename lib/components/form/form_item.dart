import 'package:bruno/bruno.dart';
import 'package:flutter/material.dart';

final FormItemTitleTextStyle = BrnTextStyle(
    color: Colors.black,
    fontWeight: FontWeight.bold,
    fontSize: 14);

///  Created by wangxiangyu on 2023/4/27.
class FormItem extends StatefulWidget {
  FormItem({Key? key, this.title, required this.child}) : super(key: key);

  final String? title;
  final Widget? child;

  @override
  _FormItemState createState() => _FormItemState();
}

class _FormItemState extends State<FormItem> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          BrnBaseTitle(
            title: widget.title ?? '',
            onTip: () {
            },
            themeData: BrnFormItemConfig(
              titleTextStyle: FormItemTitleTextStyle,
              titlePaddingSm: const EdgeInsets.only(left: 0),
              titlePaddingLg: const EdgeInsets.only(left: 0),
            ),
          ),
          widget.child ?? Container()
        ],
      ),
    );
  }
}
