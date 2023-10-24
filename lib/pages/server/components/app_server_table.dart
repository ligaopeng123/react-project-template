import 'package:data_table_2/data_table_2.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:persistent_bottom_nav_bar_v2/persistent-tab-view.dart';
import '../../../components/table/simple_table.dart';
import '../../../utils/color/color_hex.dart';
import '../provider/device_home.p.dart';
import '../server_list.dart';

GlobalKey<SimpleTableState> tableKey = GlobalKey();

class AppServerTable extends StatefulWidget {
  const AppServerTable({super.key, this.homeStore, this.refresh});

  final ServerHomeStore? homeStore;
  final void Function(dynamic value)? refresh;

  @override
  AppServerTableState createState() => AppServerTableState();
}

class AppServerTableState extends State<AppServerTable> {
  late List<dynamic> _dataSource = [];

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
  }

  @override
  void initState() {
    super.initState();
    widget.homeStore?.addListener(() {
      _dataSource = widget.homeStore?.data ?? [];
      print(_dataSource);
      tableKey.currentState?.getData();
    });
  }

  @override
  void dispose() {
    super.dispose();
    widget.homeStore?.dispose();
  }

  Future<List<dynamic>> _request() async {
    return _dataSource;
  }

  _onRowTap(item) {
    pushNewScreenWithRouteSettings(
      context,
      screen: ServerList(params: {'appId': item['appid']}),
      settings: RouteSettings(name: '/ServerList'),
      withNavBar: false, // OPTIONAL VALUE. True by default.
      pageTransitionAnimation: PageTransitionAnimation.cupertino,
    ).then(widget?.refresh ?? (value) {});
  }

  @override
  Widget build(BuildContext context) {
    return SimpleTable(
      key: tableKey,
      request: _request,
      minWidth: MediaQuery.of(context).size.width,
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
          label: Text(
            '服务总数',
            style: TextStyle(fontSize: 28.sp, color: hexToColor('#3370FF')),
          ),
          fixedWidth: 90,
          numeric: true,
          onSort: (columnIndex, ascending) => tableKey.currentState
              ?.sort<num>('allcount', columnIndex, ascending),
        ),
        DataColumn2(
          label: Text('异常数',
              style: TextStyle(color: hexToColor('#F03030'), fontSize: 28.sp)),
          fixedWidth: 80,
          numeric: true,
          onSort: (columnIndex, ascending) => tableKey.currentState
              ?.sort<num>('abnormalcount', columnIndex, ascending),
        ),
        DataColumn2(
          label: Text('正常数',
              style: TextStyle(color: hexToColor('#50C818'), fontSize: 28.sp)),
          numeric: true,
          fixedWidth: 95,
          onSort: (columnIndex, ascending) => tableKey.currentState
              ?.sort<num>('normalcount', columnIndex, ascending),
        ),
      ],
      renderRows: (item) {
        return DataRow(cells: [
          DataCell(onTap: () {
            _onRowTap(item);
          }, Text('${item['appname']}', style: TextStyle(fontSize: 28.sp))),
          DataCell(
              Text('${item['allcount']}', style: TextStyle(fontSize: 28.sp))),
          DataCell(Text('${item['abnormalcount']}',
              style: TextStyle(color: hexToColor('#F03030'), fontSize: 28.sp))),
          DataCell(Text(
              '${item['normalcount'] ?? 0}',
              style: TextStyle(color: hexToColor('#50C818'), fontSize: 28.sp))),
        ]);
      },
    );
  }
}
