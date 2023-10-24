import 'package:flutter/material.dart';
import '../../../components/text/tags_text.dart';
import '../events_service.dart';

///  Created by pgli on 2023/4/25.
class EventLevelTags extends StatefulWidget {
  EventLevelTags({Key? key, this.eventLevel}) : super(key: key);

  final String? eventLevel;

  @override
  _EventLevelTagsState createState() => _EventLevelTagsState();
}

class _EventLevelTagsState extends State<EventLevelTags> {
  @override
  Widget build(BuildContext context) {
    final color = EVENT_LEVEL_MAP_COLOR[widget.eventLevel];
    return TagsText(
      text: EVENT_LEVEL_MAP[widget.eventLevel] ?? '',
      backgroundColor: color['backgroundColor'],
      color: color['color'],
    );
  }
}
