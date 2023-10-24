import 'package:data_table_2/data_table_2.dart';
import 'package:flutter/material.dart';
import 'package:smart_iot_app/utils/color/color_hex.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:persistent_bottom_nav_bar_v2/persistent-tab-view.dart';
import '../../../components/table/simple_table.dart';
import '../events_home/provider/events_home.p.dart';
import '../events_list/events_list.dart';

GlobalKey<SimpleTableState> tableKey = GlobalKey();

class AppEventsTable extends StatefulWidget {
  const AppEventsTable({super.key, this.homeStore, this.refresh});

  final Events_homeStore? homeStore;
  final void Function(dynamic value)? refresh;

  @override
  AppEventsTableState createState() => AppEventsTableState();
}

class AppEventsTableState extends State<AppEventsTable> {
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
  }

  @override
  void initState() {
    super.initState();
    widget.homeStore?.addListener(() {
      _dataSource = widget.homeStore?.appEventStatTodayList ?? [];
      tableKey.currentState?.getData();
    });
  }

  @override
  void dispose() {
    super.dispose();
    widget.homeStore?.dispose();
  }

  late List<dynamic> _dataSource = [];

  Future<List<dynamic>> _request() async {
    return _dataSource;
  }

  _onRowTap(item) {
    pushNewScreenWithRouteSettings(
      context,
      screen: Events_list(params: {'appId': item['appId']}),
      settings: RouteSettings(name: '/Events_list'),
      withNavBar: false, // OPTIONAL VALUE. True by default.
      pageTransitionAnimation: PageTransitionAnimation.cupertino,
    ).then(widget.refresh ?? (value) {});
  }

  @override
  Widget build(BuildContext context) {
    return SimpleTable(
      key: tableKey,
      request: _request,
      columns: [
        DataColumn2(
          fixedWidth: 60,
          label: Text(
            '名称',
            style: TextStyle(fontSize: 28.sp),
          ),
          size: ColumnSize.S,
        ),
        DataColumn2(
          label: Text('报警\n设备数',
              textAlign: TextAlign.center,
              style: TextStyle(color: hexToColor('#F03030'), fontSize: 28.sp)),
          fixedWidth: 90,
          numeric: true,
          onSort: (columnIndex, ascending) => tableKey.currentState
              ?.sort<num>('alarmDeviceCount', columnIndex, ascending),
        ),
        DataColumn2(
          label: Text('事件数',
              textAlign: TextAlign.center,
              style: TextStyle(color: hexToColor('#3370FF'), fontSize: 28.sp)),
          fixedWidth: 80,
          numeric: true,
          onSort: (columnIndex, ascending) => tableKey.currentState
              ?.sort<num>('increasedCount', columnIndex, ascending),
        ),
        DataColumn2(
          label: Text('设备平均\n事件数',
              textAlign: TextAlign.center,
              style: TextStyle(color: hexToColor('#50C818'), fontSize: 28.sp)),
          numeric: true,
          fixedWidth: 90,
          onSort: (columnIndex, ascending) => tableKey.currentState
              ?.sort<num>('averageCount', columnIndex, ascending),
        ),
      ],
      renderRows: (item) {
        return DataRow(cells: [
          DataCell(onTap: () {
            _onRowTap(item);
          }, Text('${item['appName']}', style: TextStyle(fontSize: 28.sp))),
          DataCell(Text('${item['alarmDeviceCount']}',
              style: TextStyle(color: hexToColor('#F03030'), fontSize: 28.sp))),
          DataCell(Text('${item['increasedCount']}',
              style: TextStyle(color: hexToColor('#3370FF'), fontSize: 28.sp))),
          DataCell(Text('${item['averageCount']?.toStringAsFixed(2)}',
              style: TextStyle(color: hexToColor('#50C818'), fontSize: 28.sp))),
        ]);
      },
    );
  }
}
