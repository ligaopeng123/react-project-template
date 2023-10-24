import 'package:bruno/bruno.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:smart_iot_app/components/form/form_item.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:intl/intl.dart';
import 'package:smart_iot_app/utils/index.dart';

import '../../utils/color/color_hex.dart';
import '../omni_date_time_picker/omni_datetime_picker.dart';

///  Created by wangxiangyu on 2023/4/27.
class FormDateRange extends StatefulWidget {
  FormDateRange({Key? key, this.title}) : super(key: key);

  final String? title;

  @override
  FormDateRangeState createState() => FormDateRangeState();
}

class FormDateRangeState extends State<FormDateRange> {
  late String _startTime = '请选择开始时间';
  late String _endTime = '请选择结束时间';
  var _timeValue = {};

  reset() {
    setState(() {
      _timeValue = {};
      _startTime = '请选择开始时间';
      _endTime = '请选择结束时间';
    });
  }

  getValue() {
    return _timeValue;
  }

  void _showTime() {
    String format = 'yyyy-MM-dd HH:mm:ss';
    BrnPickerTitleConfig pickerTitleConfig =
        BrnPickerTitleConfig(titleContent: "选择时间范围");
    BrnDateRangePicker.showDatePicker(context,
        isDismissible: false,
        minDateTime: DateTime(2010, 06, 01, 00, 00, 00),
        maxDateTime: DateTime(2029, 07, 24, 23, 59, 59),
        pickerMode: BrnDateTimeRangePickerMode.date,
        minuteDivider: 10,
        pickerTitleConfig: pickerTitleConfig,
        dateFormat: format,
        onConfirm: (startDateTime, endDateTime, startlist, endlist) {
      setState(() {
        _startTime = DateFormat('yyyy-MM-dd HH:mm:ss').format(startDateTime);
        _endTime = DateFormat('yyyy-MM-dd HH:mm:ss')
            .format(endDateTime)
            .replaceAll('00:00:00', '23:59:59');
        _timeValue = {'startTime': _startTime, 'endTime': _endTime};
      });
    },
        onClose: () {},
        onCancel: () {},
        onChange: (startDateTime, endDateTime, startlist, endlist) {});
  }

  void _showTime2() async {
    isTextEmpty(_startTime);
    List<DateTime>? dateTimeList = await showOmniDateTimeRangePicker(
        context: context,
        startInitialDate:
            _timeValue.isEmpty ? DateTime.now() : DateTime.parse(_startTime),
        startFirstDate: DateTime(1600).subtract(const Duration(days: 3652)),
        startLastDate: DateTime.now().add(
          const Duration(days: 3652),
        ),
        endInitialDate:
            _timeValue.isEmpty ? DateTime.now() : DateTime.parse(_endTime),
        endFirstDate: DateTime(1600).subtract(const Duration(days: 3652)),
        endLastDate: DateTime.now().add(
          const Duration(days: 3652),
        ),
        is24HourMode: true,
        isShowSeconds: true,
        minutesInterval: 1,
        secondsInterval: 1,
        borderRadius: const BorderRadius.all(Radius.circular(16)),
        constraints: const BoxConstraints(
          maxWidth: 350,
          maxHeight: 650,
        ),
        transitionBuilder: (context, anim1, anim2, child) {
          return FadeTransition(
            opacity: anim1.drive(
              Tween(
                begin: 0,
                end: 1,
              ),
            ),
            child: child,
          );
        },
        transitionDuration: const Duration(milliseconds: 200),
        barrierDismissible: true,
        selectableDayPredicate: (dateTime) {
          // Disable 25th Feb 2023
          if (dateTime == DateTime(2023, 2, 25)) {
            return false;
          } else {
            return true;
          }
        },
        onSavePressed: (date) {
          if (date[0].compareTo(date[1]) > 0) {
            Tips.warn('开始日期不能大于结束日期');
            return false;
          }
          return true;
        });

    if (dateTimeList != null) {
      setState(() {
        final startTime = DateFormat('yyyy-MM-dd HH:mm:ss')
            .format(dateTimeList![0])
            .toString();
        final endTime = DateFormat('yyyy-MM-dd HH:mm:ss')
            .format(dateTimeList![1])
            .toString();
        _timeValue = {'startTime': startTime, 'endTime': endTime};
        _startTime = startTime;
        _endTime = endTime;
      });
    } else {}
  }

  @override
  Widget build(BuildContext context) {
    return FormItem(
      title: widget.title ?? '',
      child: InkWell(
        onTap: () {
          _showTime2();
        },
        child: Container(
          height: 48.h,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(_startTime),
              Text('-'),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(_endTime),
                  if (_timeValue.isNotEmpty)
                    InkWell(
                        onTap: () {
                          setState(() {
                            _timeValue = {};
                            _startTime = '请选择开始时间';
                            _endTime = '请选择结束时间';
                          });
                        },
                        child: Container(
                          padding: EdgeInsets.only(left: 12.w),
                          child: new Icon(
                            CupertinoIcons.clear,
                            color: hexToColor('#666666'),
                            size: 28.sp,
                          ),
                        ))
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
