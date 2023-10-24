import 'package:bruno/bruno.dart';
import 'package:flutter/material.dart';

import '../../components/text/app_bar_title.dart';

///  Created by wangxiangyu on 2023/10/24.
class Events extends StatefulWidget {
  Events({Key? key, this.params}) : super(key: key);

  final dynamic params;

  @override
  _EventState createState() => _EventState();
}

class _EventState extends State<Events> {
  @override
  Widget build(BuildContext context) {
    return PageRefresh(
        // extendBodyBehindDeviceBar: true,
        title: AppBarTitle(title: '事件概览'),
        onRefresh: () async {},
        children: [
          Container(
            child: Text('事件'),
          )
        ]);
  }
}
