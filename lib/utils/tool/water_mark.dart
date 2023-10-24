import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_watermark/flutter_watermark.dart';

import '../../pages/Login/user_util.dart';

buildWatermark(context, {TextStyle? textStyle}) async {
  final userInfo = await UserUtil.getUserInfo();
  final realName = userInfo.realName;
  final phone = userInfo.phone ?? '';
  final last_4_digits = phone.substring((phone?.length ?? 4) - 4);
  final DisableScreenshots _plugin = DisableScreenshots();
  _plugin.addWatermark(context, "$realName $last_4_digits",
      rowCount: 2,
      columnCount: 4,
      textStyle: textStyle ??
          TextStyle(
              color: Color(0x08000000),
              fontSize: 14,
              decoration: TextDecoration.none));
}

compatibleBuildWatermark(context, {TextStyle? textStyle}) {
  if (kIsWeb) {
    // web端先不加水印
    // buildWatermark(context, textStyle: textStyle);
  } else {
    buildWatermark(context, textStyle: textStyle);
  }
}

compatibleRemoveWatermark() {
  final DisableScreenshots _plugin = DisableScreenshots();
  // 移除水印
  _plugin.removeWatermark();
}

buildDarkWatermark(context) {
  compatibleBuildWatermark(context, textStyle: TextStyle(
      color: Color(0x1AFFFFFF),
      fontSize: 14,
      decoration: TextDecoration.none));
}

buildWhiteWatermark(context) {
  compatibleBuildWatermark(context, textStyle: TextStyle(
      color: Color(0x08000000),
      fontSize: 14,
      decoration: TextDecoration.none));
}
