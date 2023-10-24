import 'package:bruno/bruno.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:modal_bottom_sheet/modal_bottom_sheet.dart';

import '../../utils/color/color_hex.dart';
import '../list/search_tree.dart';
import 'form_item.dart';

///  Created by wangxiangyu on 2023/5/23.
class FormTree extends StatefulWidget {
  final String? title;
  final List treeData;
  final Map<String, String>? fieldNames;

  FormTree({Key? key, this.title, required this.treeData, this.fieldNames})
      : super(key: key);

  @override
  FormTreeState createState() => FormTreeState();
}

class FormTreeState extends State<FormTree> {
  Map _selectedNode = {};

  /**
   * 获取当前的值
   */
  getValue() {
    return _selectedNode;
  }

  /**
   * 重置当前属性
   */
  reset() {
    setState(() {
      _selectedNode = {};
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: BrnActionCardTitle(
        title: widget.title ?? '',
        // subTitle: '0/30',
        accessoryText:
            _selectedNode[widget.fieldNames?['title'] ?? 'title'] ?? '',
        themeData: BrnCardTitleConfig(titleTextStyle: FormItemTitleTextStyle),
        onTap: () {
          _showBottomSheet(context);
        },
      ),
    );
  }

  _showBottomSheet(context) {
    const size = 12.0;
    showCupertinoModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        // height: MediaQuery.of(context).size.height - 200,
        child: Scaffold(
          backgroundColor: Colors.white,
          body: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                height: size * 2,
                width: size * 2,
                margin: EdgeInsets.only(left: 12, top: 6, bottom: 6),
                decoration: BoxDecoration(
                    color: hexToColor('#F4F7FA'),
                    borderRadius: BorderRadius.circular(size * 2)),
                child: Center(
                  child: IconButton(
                    iconSize: size,
                    icon: Icon(CupertinoIcons.chevron_down),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                  ),
                ),
              ),
              Divider(color: hexToColor('#F4F7FA')),
              Container(
                height: MediaQuery.of(context).size.height -
                    MediaQuery.of(context).padding.top -
                    80,
                margin: EdgeInsets.only(left: 12, right: 12),
                child: SearchTree(
                    defaultValue: _selectedNode.isEmpty
                        ? []
                        : [_selectedNode[widget.fieldNames?['value']]],
                    treeData: widget.treeData,
                    fieldNames: widget.fieldNames,
                    onChange: (node) {
                      setState(() {
                        _selectedNode = node;
                        Navigator.pop(context);
                      });
                    }),
              ),
            ],
          ),
        ),
      ),
    ).then((value) {});
  }
}
