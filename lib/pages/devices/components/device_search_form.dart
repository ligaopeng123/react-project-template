import 'package:flutter/material.dart';

import '../../../components/form/form_input.dart';
import '../../../components/form/form_tags.dart';
import '../../../components/form/form_tree.dart';
import '../../events/components/area_tree.dart';
import '../devices_service.dart';

///  Created by wangxiangyu on 2023/4/28.
class DeviceSearchForm extends StatefulWidget {
  DeviceSearchForm({Key? key}) : super(key: key);

  @override
  DeviceSearchFormState createState() => DeviceSearchFormState();
}

class DeviceSearchFormState extends State<DeviceSearchForm> {
  GlobalKey<AreaTreeState> _areaKey = GlobalKey<AreaTreeState>();
  GlobalKey<FormTagsState> _productTypeKey = GlobalKey<FormTagsState>();
  GlobalKey<FormInputState> _devlceNameKey = GlobalKey<FormInputState>();

  late List<Map<String, dynamic>> productType = [];

  reset() {
    _areaKey?.currentState!.reset();
    _productTypeKey?.currentState!.reset();
    _devlceNameKey?.currentState!.reset();
  }

  getValue() {
    final Map<String, dynamic> params = {};
    String paramsStr = '';

    final _areaParams = _areaKey?.currentState!.getValue();
    if (_areaParams.isNotEmpty) {
      params.addAll({'areaId': _areaParams['areaId']});
      paramsStr = paramsStr + (_areaParams['areaName']?.toString() ?? '') + ' ';
    }

    final _productTypeKeyParams = _productTypeKey?.currentState!.getValue();
    if (_productTypeKeyParams.isNotEmpty) {
      params.addAll({'productId': _productTypeKeyParams['value']});
      paramsStr =
          paramsStr + (_productTypeKeyParams['label']?.toString() ?? '') + ' ';
    }

    final _devlceNameKeyParams = _devlceNameKey?.currentState!.getValue();
    if (_devlceNameKeyParams.isNotEmpty) {
      params.addAll({'name': _devlceNameKeyParams});
      paramsStr = paramsStr + (_devlceNameKeyParams ?? '') + ' ';
    }

    return {'params': params, 'paramsStr': paramsStr} as Map<String, dynamic>;
  }

  _initData() async {
    final _productType = await getProductType();

    setState(() {
      productType = _productType.map((item) {
        return {
          'label': item['productName'],
          'value': item['productId'],
        };
      }).toList();
    });
  }

  @override
  void initState() {
    super.initState();
    _initData();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      // color: Colors.red,
      child: Form(
        // autovalidateMode: autovalidateMode,
        onChanged: () {},
        child: Column(
          children: <Widget>[
            AreaTree(key: _areaKey),
            FormTags(
              key: _productTypeKey,
              title: '产品类型',
              options: productType,
            ),
            FormInput(
              key: _devlceNameKey,
              title: '设备名称',
            ),
            // FormTags(
            //   key: _onlineKey,
            //   title: '在线状态',
            //   options: mapToOpts(DEVICES_STATUS_MAP),
            // ),
          ],
        ),
      ),
    );
  }
}
