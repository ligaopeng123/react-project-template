import 'package:flutter/material.dart';

import '../../../components/form/form_date_range.dart';
import '../../../components/form/form_tags.dart';
import '../../../utils/index.dart';
import '../events_service.dart';
import 'area_tree.dart';

///  Created by wangxiangyu on 2023/4/27.
class EventSearchForm extends StatefulWidget {
  final initialValues;

  EventSearchForm({Key? key, this.initialValues}) : super(key: key);

  @override
  EventSearchFormState createState() => EventSearchFormState();
}

class EventSearchFormState extends State<EventSearchForm> {
  GlobalKey<AreaTreeState> _areaKey = GlobalKey<AreaTreeState>();
  GlobalKey<FormTagsState> _eventKey = GlobalKey<FormTagsState>();
  GlobalKey<FormTagsState> _eventTypeKey = GlobalKey<FormTagsState>();
  GlobalKey<FormTagsState> _handelKey = GlobalKey<FormTagsState>();
  GlobalKey<FormDateRangeState> _timeKey = GlobalKey<FormDateRangeState>();

  late List<Map<String, dynamic>> eventLevel = [];
  late List<Map<String, dynamic>> eventType = [];

  @override
  void initState() {
    super.initState();
    _initData();
  }

  reset() {
    _areaKey?.currentState!.reset();
    _eventKey?.currentState!.reset();
    _eventTypeKey?.currentState!.reset();
    _handelKey?.currentState!.reset();
    _timeKey?.currentState!.reset();
  }

  getValue() {
    final Map<String, dynamic> params = {};
    String paramsStr = '';

    final _areaParams = _areaKey?.currentState!.getValue();
    if (_areaParams.isNotEmpty) {
      params.addAll({'areaId': _areaParams['areaId']});
      paramsStr = paramsStr + (_areaParams['areaName']?.toString() ?? '') + ' ';
    }

    final _eventKeyParams = _eventKey?.currentState!.getValue();
    if (_eventKeyParams.isNotEmpty) {
      params.addAll({'eventLevel': _eventKeyParams['value']});
      paramsStr =
          paramsStr + (_eventKeyParams['label']?.toString() ?? '') + ' ';
    }

    final _eventTypeKeyParams = _eventTypeKey?.currentState!.getValue();
    if (_eventTypeKeyParams.isNotEmpty) {
      params.addAll({'eventTag': _eventTypeKeyParams['value']});
      paramsStr =
          paramsStr + (_eventTypeKeyParams['label']?.toString() ?? '') + ' ';
    }

    final _handelKeyParams = _handelKey?.currentState!.getValue();
    if (_handelKeyParams.isNotEmpty) {
      params.addAll({'handleStatus': _handelKeyParams['value']});
      paramsStr =
          paramsStr + (_handelKeyParams['label']?.toString() ?? '') + ' ';
    }

    final _timeKeyParams = _timeKey?.currentState!.getValue();
    if (_timeKeyParams.isNotEmpty) {
      final startTime = _timeKeyParams['startTime'];
      final endTime = _timeKeyParams['endTime'];
      params.addAll({'beginTime': startTime, 'endTime': endTime});
      paramsStr = paramsStr + "$startTime - $endTime";
    }

    return {'params': params, 'paramsStr': paramsStr} as Map<String, dynamic>;
  }

  _initData() async {
    final _eventLevel = await getDictData('eventLevel');
    final _eventType = await getEventType();

    setState(() {
      eventLevel = _eventLevel.map((item) {
        return {
          'label': item['value'],
          'value': item['key'],
        };
      }).toList();

      eventType = _eventType.map((item) {
        return {
          'label': item['alarmName'],
          'value': item['alarmTag'],
        };
      }).toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      // color: Colors.red,
      child: Form(
        // key: _formKey,
        // autovalidateMode: autovalidateMode,
        onChanged: () {
          print(1);
        },
        child: Column(
          children: <Widget>[
            AreaTree(key: _areaKey),
            FormTags(
                key: _eventKey,
                title: '事件等级',
                options: eventLevel,
                rowCount: 4),
            FormTags(
              key: _eventTypeKey,
              title: '事件类型',
              options: eventType,
              initValue: widget.initialValues?['eventTag'],
            ),
            FormTags(
              key: _handelKey,
              title: '处理状态',
              options: mapToOpts(EVENT_HANDLE_STATUS_MAP_2),
            ),
            FormDateRange(key: _timeKey, title: '事件时间'),
          ],
        ),
      ),
    );
  }
}
