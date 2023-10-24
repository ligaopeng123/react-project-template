import 'package:flutter/material.dart';
import 'package:data_table_2/data_table_2.dart';

///  Created by pgli on 2023/4/20.
class SimpleTable extends StatefulWidget {
  SimpleTable({
    Key? key,
    this.columns: const [],
    this.dataSource: const [],
    this.dataRow: const DataRow(cells: []),
    this.minWidth: 360.0,
    this.request,
    this.renderRows,
  }) : super(key: key);

  final List<DataColumn> columns;
  final List<Map<String, dynamic>> dataSource;
  final DataRow dataRow;
  final double minWidth;

  /// 获取数据
  final Future<List<dynamic>> Function()? request;

  final DataRow Function(Map<String, dynamic>)? renderRows;

  @override
  SimpleTableState createState() => SimpleTableState();
}

class SimpleTableState extends State<SimpleTable> {
  bool _sortAscending = true;
  int? _sortColumnIndex;
  late List<dynamic> _dataSource = [];

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
  }

  void sort<T>(
    String key,
    int columnIndex,
    bool ascending,
  ) {
    setState(() {
      _sortColumnIndex = columnIndex;
      _sortAscending = ascending;
      final newDataSource = [..._dataSource];

      /// 生序
      if (_sortAscending) {
        newDataSource.sort((a, b) => a[key].compareTo(b[key]));
      } else {
        newDataSource.sort((a, b) => b[key].compareTo(a[key]));
      }
      _dataSource = newDataSource;
    });
  }

  getData() async {
    if (widget.request != null) {
      final currentData = await widget?.request!();
      if (currentData != null) {
        setState(() {
          _dataSource = currentData;
        });
      }
    }
  }

  void initState() {
    super.initState();
    _scrollController.addListener(_scrollListener);
    getData();
  }

  @override
  void dispose() {
    super.dispose();
    _scrollController.removeListener(_scrollListener);
  }

  void _scrollListener() {
    _scrollController.jumpTo(
      0.0,
    );
  }

  final _scrollController = ScrollController();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(0),
      child: DataTable(
        // scrollController: _scrollController,
        // horizontalScrollController: _scrollController,
        columnSpacing: 0,
        horizontalMargin: 0,
        dividerThickness: 1,
        // this one will be ignored if [border] is set above
        // bottomMargin: 10,
        // minWidth: widget.minWidth,
        showCheckboxColumn: false,
        sortColumnIndex: _sortColumnIndex,
        sortAscending: _sortAscending,
        // sortArrowIcon: Icons.keyboard_arrow_up,
        // custom arrow
        // sortArrowAnimationDuration: const Duration(milliseconds: 500),
        // custom animation duration
        // onSelectAll: (val) =>
        //     setState(() => _dataSource.selectAll(val)),
        columns: widget.columns,
        // empty: Center(
        //     child: Container(
        //         padding: const EdgeInsets.all(20),
        //         child: const Text(
        //           '暂无数据',
        //           style: TextStyle(color: Colors.grey),
        //         ))),
        rows: _dataSource
            .map(
              (item) => widget.renderRows!(item),
            )
            .toList(),
      ),
    );
  }
}
