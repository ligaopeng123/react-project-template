import 'package:flutter/material.dart';

import '../../../components/form/form_tree.dart';
import '../events_service.dart';

///  Created by wangxiangyu on 2023/6/6.
class AreaTree extends StatefulWidget {
  AreaTree({Key? key}) : super(key: key);

  @override
  AreaTreeState createState() => AreaTreeState();
}

class AreaTreeState extends State<AreaTree> {
  GlobalKey<FormTreeState> _formTreeKey = GlobalKey<FormTreeState>();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _initState();
  }

  late List areaData = [];

  getValue() {
    return _formTreeKey?.currentState?.getValue();
  }

  reset() {
    _formTreeKey?.currentState?.reset();
  }

  _initState() async {
    List _area = await getAreaList();
    setState(() {
      areaData = _area;
    });
  }

  @override
  Widget build(BuildContext context) {
    return FormTree(
      key: _formTreeKey,
      title: '区域',
      treeData: areaData,
      fieldNames: {'title': 'areaName', 'value': 'areaId'},
    );
  }
}
