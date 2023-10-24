import 'package:flutter/material.dart';

///  Created by wangxiangyu on 2023/5/11.
class BasicRouter extends StatefulWidget {
  BasicRouter({Key? key, required this.child}) : super(key: key);

  final Widget child;

  @override
  _BasicRouterState createState() => _BasicRouterState();
}

class _BasicRouterState extends State<BasicRouter> {
  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      child: widget.child,
      onWillPop: () async {
        // 禁止返回上一个页面
        return Future.value(true);
      },
    );
  }
}
