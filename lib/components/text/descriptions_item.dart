import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

///  Created by pgli on 2023/4/21.
class DescriptionsItem extends StatefulWidget {
  DescriptionsItem({Key? key, this.label: '', this.value: '', this.tags})
      : super(key: key);

  final String label;
  final dynamic value;
  final Widget? tags;

  @override
  _DescriptionsItemState createState() => _DescriptionsItemState();
}

class _DescriptionsItemState extends State<DescriptionsItem> {
  @override
  Widget build(BuildContext context) {
    final label = widget.label;
    final value = widget.value;
    return Container(
      padding: EdgeInsets.only(top: 8),
      constraints: BoxConstraints(
          minWidth: 50, maxWidth: MediaQuery.of(context).size.width - 32),
      child: Row(
        children: [
          Text('$label：', style: TextStyle(fontSize: 14)),
          if (value is Widget)
            Container(
              child: widget.value,
            ),
          if (value != null && !(value is Widget))
            Expanded(
              child: Text(value.toString(),
                  style: TextStyle(fontSize: 14),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis),
            ),
        ],
      ),
    );
  }
}
