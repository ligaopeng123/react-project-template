import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';
import 'package:flutter/cupertino.dart';
import 'package:smart_iot_app/components/basic_safe_area/basic_compatibility.dart';

import '../../utils/color/color_hex.dart';

///  Created by pgli on 2023/4/19.
class CardPie extends StatefulWidget {
  CardPie({Key? key, this.title, this.value, this.size, this.isFix})
      : super(key: key);

  /// 表头
  final String? title;

  /// 右侧自定义组件
  final String? value;

  final double? size;

  final bool? isFix;

  @override
  _CardPieState createState() => _CardPieState();
}

class _CardPieState extends State<CardPie> {
  final labelColor = Color.fromRGBO(0, 0, 0, 0.6);

  @override
  Widget build(BuildContext context) {
    final size = widget.size ?? 100.0;
    final radius = size / 2;
    return Center(
      child: _buildPie(12, radius, false),
    );
    // return widget.isFix == true && !kIsWeb
    //     ? _buildWebPie(size)
    //     : Center(
    //         child: _buildPie(12, radius, false),
    //       );
  }

  Widget _buildWebPie(size) {
    final value = widget.value!.replaceAll('%', '');
    final num = double.parse(value);
    var str = '';
    if (num > 98) {
      str = '98_100';
    } else if (num > 90) {
      str = '90_98';
    } else if (num < 10) {
      str = '00_10';
    } else {
      final percent = value?.substring(0, 1);
      var endVal = int.parse(percent ?? '0') + 1;
      str = '${percent}0_${endVal}0';
    }

    var textSize = getTextSize(context, widget.value ?? '',
        TextStyle(fontWeight: FontWeight.bold, fontSize: 16.0));
    return BasicCompatibility(
        changeParams: widget.value,
        child: Center(
          child: Column(
            children: [
              Stack(
                children: [
                  Image.asset(
                    'asset/images/ring/bg.png',
                    width: size,
                    height: size,
                  ),
                  if (num > 0.0)
                    Image.asset(
                      'asset/images/ring/${str}.png',
                      width: size,
                      height: size,
                    ),
                  Positioned(
                      child: _value(),
                      left: size / 2 - textSize.width / 2,
                      top: size / 2 - 8)
                ],
              ),
              _title()
            ],
          ),
        ));
  }

  Widget _title() {
    return Padding(
      padding: EdgeInsets.only(top: 6.0),
      child: new Text(
        widget.title ?? '',
        style: new TextStyle(fontSize: 14.0),
      ),
    );
  }

  Widget _value() {
    return new Text(
      widget.value ?? '0',
      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16.0),
    );
  }

  Widget _buildPie(double lineWidth, double radius, bool isHelper) {
    final percent = double.parse(widget.value!.replaceAll('%', '')) / 100;
    return CircularPercentIndicator(
        radius: radius,
        lineWidth: lineWidth,
        animation: true,
        percent: percent > .95 && percent != 1
            ? percent - .02
            : percent,
        center: isHelper ? null : _value(),
        footer: isHelper ? null : _title(),
        circularStrokeCap: CircularStrokeCap.round,
        progressColor: isHelper ? Colors.white : Color(0xFF3370FF),
        backgroundColor: isHelper ? Colors.white : Color(0xFFE4E6EA));
  }
}
