import 'package:bruno/bruno.dart';
import 'package:flutter/material.dart';
import '../../utils/color/color_hex.dart';
import '../../utils/index.dart';

///  Created by pgli on 2023/4/21.
class TagsText extends StatefulWidget {
  TagsText({Key? key, this.text: '', this.color, this.backgroundColor})
      : super(key: key);

  final String text;
  final String? backgroundColor;
  final String? color;

  @override
  _TagsTextState createState() => _TagsTextState();
}

class _TagsTextState extends State<TagsText> {
  @override
  Widget build(BuildContext context) {
    return BrnStateTag(
      tagText: widget.text,
      textColor: !isTextEmpty(widget.color)
          ? hexToColor(widget.color ?? '')
          : Colors.black,
      backgroundColor: isTextEmpty(widget.backgroundColor)
          ? Color(0xFF9E9E9E)
          : hexToColor(widget.backgroundColor ?? ''),
    );
  }
}
