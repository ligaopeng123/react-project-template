import 'package:flutter/material.dart';
import '../../utils/color/color_hex.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../utils/index.dart';

///  Created by pgli on 2023/4/19.
class CardStatistics extends StatefulWidget {
  CardStatistics({
    Key? key,
    this.list: const [],
    this.data: const {},
  }) : super(key: key);

  /// 数据
  final List<Map<String, dynamic>> list;

  final Map<String, dynamic> data;

  @override
  _CardStatisticsState createState() => _CardStatisticsState();
}

class _CardStatisticsState extends State<CardStatistics> {
  @override
  Widget build(BuildContext context) {
    return Wrap(
      direction: Axis.horizontal,
      alignment: WrapAlignment.center,
      crossAxisAlignment: WrapCrossAlignment.center,
      // 居中对齐
      spacing: 8.0,
      runSpacing: 8.0,
      children: _todayList(),
    );
  }

  List<Widget> _todayList() {
    try {
      return widget.list.asMap().keys.map<Widget>((index) {
        dynamic itemData = widget.list[index];
        dynamic todayValue = widget.data;
        return Container(
            padding: EdgeInsets.only(top: index == 0 ? 0 : 8.w),
            child: Container(
              constraints: BoxConstraints(
                minWidth: 140.0,
                minHeight: 30,
              ),
              margin: EdgeInsets.only(left: 16.w, right: 16.w),
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: AssetImage(itemData['bg']),
                  fit: BoxFit.fill,
                ),
                borderRadius: BorderRadius.circular(4.0),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Container(
                    padding: EdgeInsets.only(left: 4, top: 12),
                    width: 60, height: 60,
                    child: Image.asset(itemData['icon']),),
                  Container(
                    padding: EdgeInsets.only(top: 8, bottom: 8),
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            todayValue[itemData['key']],
                            style: TextStyle(
                                color: !isTextEmpty(itemData['color'])
                                    ? hexToColor(itemData['color'])
                                    : hexToColor('#000000'),
                                fontSize: 20),
                          ),
                          Text(
                            itemData['name'],
                            style: TextStyle(
                                color: hexToColor('#000000'), fontSize: 14),
                          ),
                        ]),
                  ),
                ],
              ),
            ));
      }).toList();
    } catch (e) {
      throw Exception('appBottomBar数据缺少参数、或字段类型不匹配, errorMsg:$e');
    }
  }
}
