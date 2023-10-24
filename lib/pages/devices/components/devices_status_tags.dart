import 'package:flutter/material.dart';

import '../../../components/text/tags_text.dart';
import '../devices_service.dart';

///  Created by pgli on 2023/4/25.
class DevicesStatusTags extends StatefulWidget {
  DevicesStatusTags({Key? key, this.status}) : super(key: key);

  final String? status;

  @override
  _DevicesStatusTagsState createState() => _DevicesStatusTagsState();
}

class _DevicesStatusTagsState extends State<DevicesStatusTags> {
  @override
  Widget build(BuildContext context) {
    final color = DEVICES_STATUS_MAP_COLOR[widget.status] ?? {};
    return TagsText(
      text: DEVICES_STATUS_MAP[widget.status] ?? '',
      backgroundColor: color['backgroundColor'],
      color: color['color'],
    );
  }
}
