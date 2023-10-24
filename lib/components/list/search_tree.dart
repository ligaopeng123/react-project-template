import 'package:flutter/material.dart';

import '../page_loding/loading.dart';
import '../tree/flutter_tree.dart';

/// Your server data
final serverData = [
  {
    "checked": false,
    "children": [
      {
        "checked": false,
        "show": false,
        "children": [],
        "id": 11,
        "pid": 1,
        "text": "Child title 11",
      },
      {
        "checked": false,
        "show": false,
        "children": [],
        "id": 13,
        "pid": 1,
        "text": "Child title 12",
      },
    ],
    "id": 1,
    "pid": 0,
    "show": true,
    "text": "Parent title 1",
  },
  {
    "checked": false,
    "show": false,
    "children": [],
    "id": 2,
    "pid": 0,
    "text": "Parent title 2",
  },
  {
    "checked": false,
    "children": [],
    "id": 3,
    "pid": 0,
    "show": false,
    "text": "Parent title 3",
  },
];

/// Map server data to tree node data
TreeNodeData mapServerDataToTreeData(
    Map data, Map _fieldNames, List defaultValue, bool expanded) {
  return TreeNodeData(
    extra: data,
    title: data[_fieldNames['title']],
    expanded: true,
    checked: defaultValue.contains(data[_fieldNames['value']]),
    children: List.from(data[_fieldNames['children']].map(
        (x) => mapServerDataToTreeData(x, _fieldNames, defaultValue, false))),
  );
}

/// Generate tree data
// List<TreeNodeData> treeData = List.generate(
//   serverData.length,
//   (index) => mapServerDataToTreeData(serverData[index]),
// );

///  Created by wangxiangyu on 2023/5/23.
class SearchTree extends StatefulWidget {
  final List treeData;
  final Map<String, String>? fieldNames;
  final void Function(Map node)? onChange;
  final List? defaultValue;

  SearchTree(
      {Key? key,
      this.onChange,
      required this.treeData,
      this.fieldNames,
      this.defaultValue})
      : super(key: key);

  @override
  _SearchTreeState createState() => _SearchTreeState();
}

class _SearchTreeState extends State<SearchTree> {
  late List<TreeNodeData> _treeData = [];

  late Map<String, String> _fieldNames = {};

  @override
  void initState() {
    super.initState();
    setState(() {
      var fieldNames = {
        'title': 'title',
        'value': 'value',
        'children': 'children'
      };
      fieldNames.addAll(widget.fieldNames ?? {});
      _fieldNames = fieldNames;
      List<TreeNodeData> treeData = List.generate(
        widget.treeData.length,
        (index) => mapServerDataToTreeData(widget.treeData[index] as Map,
            _fieldNames, widget.defaultValue ?? [], true),
      );
      _treeData = treeData;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: _treeData.length == 0
          ? Loading()
          : TreeView(
              data: _treeData,
              // showActions: true,
              showCheckBox: true,
              showFilter: true,
              contentTappable: true,
              filterPlaceholder: "请输入查询内容",
              manageParentState: false,
              showActions: false,
              defaultFilterValue: '',
              onCheck: (checked, node) {
                widget?.onChange!(node.extra);
              },
            ),
    );
  }
}
