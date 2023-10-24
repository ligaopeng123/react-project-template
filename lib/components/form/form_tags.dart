import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../page_loding/loading.dart';
import 'form_item.dart';
import 'form_item_tags.dart';

///  Created by wangxiangyu on 2023/4/27.
class FormTags extends StatefulWidget {
  FormTags({
    Key? key,
    this.options: const [],
    this.title,
    this.initValue,
    this.rowCount: 3,
  }) : super(key: key);

  final List<Map<String, dynamic>> options;
  final String? title;
  final initValue;
  final int rowCount;

  @override
  FormTagsState createState() => FormTagsState();
}

class FormTagsState extends State<FormTags> {
  double _getTagWidth(context, {int rowCount: 3}) {
    double leftRightPadding = 66.0;
    double rowItemSpace = 4;
    return (MediaQuery.of(context).size.width -
            leftRightPadding -
            rowItemSpace * (rowCount - 1)) /
        rowCount;
  }

  var _selected = [];
  late List<bool> _initTagState = [];

  GlobalKey<FormBrnSelectTagState> _tagKey = GlobalKey<FormBrnSelectTagState>();

  reset() {
    _tagKey.currentState!.reset();
  }

  getValue() {
    if (_selected.isNotEmpty && _selected[0] != null) {
      return widget.options[_selected[0]];
    } else {
      return {};
    }
  }

  @override
  void didUpdateWidget(FormTags oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.options != oldWidget.options && widget.initValue != null) {
      setState(() {
        List<bool> currentInitTagState = [];
        int index = 0;
        widget.options.forEach((element) {
          bool isSelected = element['value'] == widget.initValue;
          currentInitTagState.add(isSelected);
          if (isSelected) {
            _selected = [index];
          }
          index++;
        });
        _initTagState = currentInitTagState;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return FormItem(
      title: widget.title ?? '',
      child: widget.options.length > 0
          ? FormBrnSelectTag(
              initTagState: _initTagState,
              key: _tagKey,
              tags: widget.options.map((v) {
                return v['label'].toString();
              }).toList(),
              fixWidthMode: true,
              spacing: 4,
              isSingleSelect: true,
              tagWidth: _getTagWidth(context, rowCount: widget.rowCount),
              onSelect: (selectedIndexes) {
                setState(() {
                  _selected = selectedIndexes;
                });
              })
          : Loading(),
    );
  }
}
