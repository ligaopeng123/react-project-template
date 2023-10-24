import 'package:flutter/material.dart';
import '../../utils/color/color_hex.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../utils/index.dart';

///  Created by pgli on 2023/4/19.
class CardIndicatorStatistics extends StatefulWidget {
  CardIndicatorStatistics({
    Key? key,
    this.list: const [],
    this.data: const {},
  }) : super(key: key);

  /// 数据
  final List<Map<String, dynamic>> list;

  final Map<String, dynamic> data;

  @override
  _CardIndicatorStatisticsState createState() =>
      _CardIndicatorStatisticsState();
}

class _CardIndicatorStatisticsState extends State<CardIndicatorStatistics> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(top: 16.h, bottom: 16.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: _todayList(),
      ),
    );
  }

  List<Widget> _todayList() {
    try {
      return widget.list.asMap().keys.map<Widget>((index) {
        dynamic itemData = widget.list[index];
        dynamic todayValue = widget.data;
        final name = itemData['name'];
        final value = todayValue[itemData['key']];
        return Expanded(
            child: Container(
                padding: EdgeInsets.only(left: 12.sp, right: 12.sp),
                decoration: BoxDecoration(
                  border: Border(
                    right: BorderSide(
                      width: 1.sp, //宽度
                      color: index < widget.list.length - 1
                          ? hexToColor('#D9D9D9')
                          : Colors.transparent, //边框颜色
                    ),
                  ),
                ),
                child: Container(
                  margin: EdgeInsets.only(left: 12.sp, right: 12.sp),
                  child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Text(
                          '${value}',
                          style: TextStyle(
                              color: !isTextEmpty(itemData['color'])
                                  ? hexToColor(itemData['color'])
                                  : hexToColor('#000000'),
                              fontSize: 48.sp,
                              fontWeight: FontWeight.w500),
                        ),
                        SizedBox(height: 16.h),
                        Text(
                          '$name',
                          style: TextStyle(
                              color: hexToColor('#000000'),
                              fontSize: 24.sp,
                              fontWeight: FontWeight.w400),
                        ),
                      ]),
                )));
      }).toList();
    } catch (e) {
      throw Exception('appBottomBar数据缺少参数、或字段类型不匹配, errorMsg:$e');
    }
  }
}
