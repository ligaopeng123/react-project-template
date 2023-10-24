import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

import '../../utils/color/color_hex.dart';

///  Created by wangxiangyu on 2023/5/12.
class BasicCompatibility extends StatefulWidget {
  BasicCompatibility({Key? key, required this.child, this.changeParams})
      : super(key: key);

  final Widget child;
  final changeParams;

  @override
  _BasicCompatibilityState createState() => _BasicCompatibilityState();
}

class _BasicCompatibilityState extends State<BasicCompatibility> {
  late bool _isRendered = kIsWeb ? false : true;

  @override
  void didUpdateWidget(BasicCompatibility oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (kIsWeb && oldWidget.changeParams != widget.changeParams) {
      Future.delayed(Duration(milliseconds: 200), () {
        setState(() {
          _isRendered = true;
        });
      });
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return _isRendered ? widget.child : Container(
      child: SpinKitFadingCircle(
        color: hexToColor('#d9d9d9'),
      ),
    );
  }
}
