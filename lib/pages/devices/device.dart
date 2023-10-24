import 'package:bruno/bruno.dart';
import 'package:flutter/material.dart';

import '../../components/text/app_bar_title.dart';

///  Created by wangxiangyu on 2023/10/24.
class Device extends StatefulWidget {
  Device({Key? key}) : super(key: key);

  @override
  _DeviceState createState() => _DeviceState();
}

class _DeviceState extends State<Device> {
  @override
  Widget build(BuildContext context) {
    return PageRefresh(
        // extendBodyBehindDeviceBar: true,
        title: AppBarTitle(title: '设备概览'),
        onRefresh: () async {
        },
        children: [
          Container(
            child: Text('设备'),
          )
        ]);
  }
}
