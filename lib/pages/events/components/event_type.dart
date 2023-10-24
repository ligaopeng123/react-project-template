import 'package:bruno/bruno.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

///  Created by wangxiangyu on 2023/6/2.
class EventType extends StatefulWidget {
  final List data;

  ///icon的事件
  final Function(Map)? onClick;

  EventType({Key? key, this.data = const [], this.onClick}) : super(key: key);

  @override
  _EventTypeState createState() => _EventTypeState();
}

class _EventTypeState extends State<EventType> {
  @override
  Widget build(BuildContext context) {
    var data = widget.data?.map((e) {
          return {'title': e['alarmName'], 'value': e['alarmCount'].toString()};
        }).toList() ??
        [];

    var minHeight = 72.0;
    return Container(
      padding: const EdgeInsets.only(top: 12),
      child: CardExtend(
          minHeight: minHeight,
          maxHeight: (data.length / 4).ceil() * minHeight,
          child: BrnEnhanceNumberCard(
            padding: const EdgeInsets.only(left: 0, right: 0),
            rowCount: 4,
            themeData: BrnEnhanceNumberCardConfig(
                titleTextStyle: BrnTextStyle(fontSize: 18)),
            itemChildren:
                data.asMap().entries.map<BrnNumberInfoItemModel>((item) {
              var itemData = item.value;
              return BrnNumberInfoItemModel(
                title: itemData['title'],
                number: itemData['value'],
                numberInfoIcon: BrnNumberInfoIcon.arrow,
                itemTapCallBack: (data) {
                  widget.onClick!(widget.data[item.key]);
                },
              );
            }).toList(),
          )),
    );
  }
}
