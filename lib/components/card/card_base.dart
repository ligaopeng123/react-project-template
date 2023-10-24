import 'package:flutter/material.dart';
import 'package:smart_iot_app/components/basic_safe_area/basic_router.dart';
import '../../utils/color/color_hex.dart';
import '../../utils/index.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

///  Created by pgli on 2023/4/19.
class CardBase extends StatefulWidget {
  CardBase(
      {Key? key,
      this.title,
      this.child,
      this.extra,
      this.onClick,
      this.padding})
      : super(key: key);

  /// 表头
  final String? title;

  /// 右侧自定义组件
  final Widget? child;
  final Widget? extra;
  final EdgeInsetsGeometry? padding;

  /// 点击跳转事件
  final void Function()? onClick;

  @override
  _CardBaseState createState() => _CardBaseState();
}

class _CardBaseState extends State<CardBase> {
  @override
  Widget build(BuildContext context) {
    var CardCom;
    final card = Card(
      elevation: 0.0,
      shape: RoundedRectangleBorder(
        // side: BorderSide(color: Colors.transparent, width: 2.0),
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Container(
        width: double.infinity,
        padding: widget.padding ?? EdgeInsets.all(32.sp),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [getTitle(), Container(child: widget.child)],
        ),
      ),
    );
    if (widget.onClick != null) {
      CardCom = new GestureDetector(
        child: card,
        onTap: () {
          if (widget.onClick != null) {
            widget.onClick!();
          }
        },
      );
    } else {
      CardCom = card;
    }
    return BasicRouter(child: CardCom);
  }

  MainAxisAlignment getAlignment() {
    if (!isTextEmpty(widget.title) && widget.onClick != null) {
      return MainAxisAlignment.spaceBetween;
    } else if (widget.onClick != null) {
      return MainAxisAlignment.end;
    } else if (widget.extra != null) {
      return MainAxisAlignment.spaceBetween;
    }
    return MainAxisAlignment.start;
  }

  Widget getTitle() {
    return Row(mainAxisAlignment: getAlignment(), children: [
      if (!isTextEmpty(widget.title))
        Expanded(
            flex: 9,
            child: Text(widget.title ?? '',
                style: TextStyle(
                    color: hexToColor('#000000'),
                    fontWeight: FontWeight.bold,
                    fontSize: 32.sp),
                overflow: TextOverflow.ellipsis)),
      if (widget.onClick != null)
        new GestureDetector(
          child: new Icon(
            CupertinoIcons.right_chevron,
            color: hexToColor('#666666'),
            size: 32.sp,
          ),
          onTap: () {
            widget.onClick!();
          },
        ),
      if (widget.extra != null) widget?.extra ?? Container()
    ]);
  }
}
