
d3.csv("sw_names.csv", (data) => {
  // Filter to get boy data
  var boyData = data
  // 数据转换和处理
  boyData.forEach(d => {
    d.day = Date.parse(d.day); // 将日期字符串解析为日期对象
    d.percent = +d.percent; // 将占比转换为数值类型
  });

  // 按照day进行分组
  var nestedData = d3.nest()
    .key(d => d.day)
    .entries(boyData);

  // 在每个年份的分组内，按照percent排序并设置排名
  nestedData.forEach(group => {
    group.values.sort((a, b) => b.percent - a.percent); // 按照占比进行降序排序
    group.values.forEach((d, index) => {
      d.position = index + 1; // 设置排名
    });
  });

  // 铺平nestedData数组
  var flattenedData = nestedData.flatMap(d => d.values);


  // 转换为指定格式
  var boysNestedByName = d3.nest()
    .key(d => d.sw_name)
    .entries(flattenedData)

  var boys = boysNestedByName.map(d => {
    return {
      sw_name: d.key,
      values: d.values.map(item => {
        return {
          day: item.day,
          position: item.position
        };
      })
    };
  });
  // 打印转换后的数据
//  console.log(boys);
    return boys
})



//d3.csv("baby-names.csv", (data) => {
//  // Filter to get boy data
//  var boyData = data.filter(d => d.sex === "boy");
//
//  // 数据转换和处理
//  boyData.forEach(d => {
//    d.day = +d.day; // 将年份转换为数值类型
//    d.percent = +d.percent; // 将占比转换为数值类型
//  });
//
//  // 按照day进行分组
//  var nestedData = d3.nest()
//    .key(d => d.day)
//    .entries(boyData);
//
//  // 在每个年份的分组内，按照percent排序并设置排名
//  nestedData.forEach(group => {
//    group.values.sort((a, b) => b.percent - a.percent); // 按照占比进行降序排序
//    group.values.forEach((d, index) => {
//      d.position = index + 1; // 设置排名
//    });
//  });
//
//  // 铺平nestedData数组
//  var flattenedData = nestedData.flatMap(d => d.values);
//
//
//  // 转换为指定格式
//  var boysNestedByName = d3.nest()
//    .key(d => d.sw_name)
//    .entries(flattenedData)
//
//  var boys = boysNestedByName.map(d => {
//    return {
//      sw_name: d.key,
//      values: d.values.map(item => {
//        return {
//          day: item.day,
//          position: item.position
//        };
//      })
//    };
//  });
//  // 打印转换后的数据
////  console.log(boys);
//    return boys
//})
