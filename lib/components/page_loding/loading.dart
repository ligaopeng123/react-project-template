import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

import '../../utils/color/color_hex.dart';

///  Created by wangxiangyu on 2023/5/24.
class Loading extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SpinKitFadingCircle(
      color: hexToColor('#d9d9d9'),
    );
  }
}
