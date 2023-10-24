import 'package:flutter/material.dart';

// 颜色处理 将16进制颜色坐下转换
class HexColor extends Color {
  static int _getColorFromHex(String hexColor) {
    hexColor = hexColor.toUpperCase().replaceAll("#", "");
    if (hexColor.length == 6) {
      hexColor = "FF" + hexColor;
    }
    return int.parse(hexColor, radix: 16);
  }

  HexColor(final String hexColor) : super(_getColorFromHex(hexColor));
}

Color hexToColor(String hexString) {
  if (hexString.startsWith('rgb')) {
    final hexList = hexString.split('(')[1].split(')')[0].split(',');
    return Color.fromRGBO(
        int.parse(hexList[0]),
        int.parse(hexList[1]),
        int.parse(hexList[2]),
        hexList[3] != null ? double.parse(hexList[3]) : 1.0);
  }
  return Color(int.parse(hexString.substring(1, 7), radix: 16) + 0xFF000000);
}

Size getTextSize(BuildContext context, String text, TextStyle style,
    {int maxLines = 2 ^ 31, double maxWidth = double.infinity}) {
  if (text == null || text.isEmpty) {
    return Size.zero;
  }
  final TextPainter textPainter = TextPainter(
      textDirection: TextDirection.ltr,
      text: TextSpan(text: text, style: style),
      locale: Localizations.localeOf(context),
      maxLines: maxLines)
    ..layout(maxWidth: maxWidth);
  return textPainter.size;
}
