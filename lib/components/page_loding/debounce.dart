import 'package:flutter/material.dart';
import 'package:async/async.dart';

///  Created by wangxiangyu on 2023/5/25.
class Debounce extends StatefulWidget {
  Debounce({
    Key? key,
    required Widget this.child,
    required this.onPressed,
    this.debounceDuration = const Duration(milliseconds: 300),
  }) : super(key: key);

  final VoidCallback onPressed;
  final Duration debounceDuration;
  final Widget child;

  @override
  _DebounceState createState() => _DebounceState();
}

class _DebounceState extends State<Debounce> {
  final AsyncMemoizer _memoizer = AsyncMemoizer();

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        _memoizer.runOnce(() {
          // 在指定的 debounceDuration 时间内只执行一次 onPressed 回调
          widget.onPressed!();
        });
      },
      child: widget.child,
    );
  }
}
