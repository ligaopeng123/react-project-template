import 'package:flutter/material.dart';

import '../../../components/text/tags_text.dart';
import '../events_service.dart';

///  Created by pgli on 2023/4/25.
class EventHandleStatusTags extends StatefulWidget {
  EventHandleStatusTags({Key? key, this.status}) : super(key: key);

  final num? status;

  @override
  _EventHandleStatusTagsState createState() => _EventHandleStatusTagsState();
}

class _EventHandleStatusTagsState extends State<EventHandleStatusTags> {
  @override
  Widget build(BuildContext context) {
    final color = EVENT_HANDLE_STATUS_MAP_COLOR[widget.status];
    return TagsText(
      text: EVENT_HANDLE_STATUS_MAP[widget.status] ?? '',
      backgroundColor: color['backgroundColor'],
      color: color['color'],
    );
  }
}
