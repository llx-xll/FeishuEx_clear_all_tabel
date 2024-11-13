import { bitable } from '@lark-base-open/js-sdk'




// 读取base信息，根据编号获取table id
async function getTableIdByName(){
  const tableMetaList = await bitable.base.getTableMetaList();
  console.log("tableMetaList:", tableMetaList)
  let out = [];
  for(const tableMeta of tableMetaList){
    const tableName = tableMeta.name
    const tableId = tableMeta.id
    out.push(tableId);
  }
  return out;
}


document.getElementById('button_1').addEventListener('click', async function () {
  console.log('button1 clicked 1')

  const userConfirmed = confirm("您确定要“清空所有表格数据”吗？");

  // 检查用户是否点击了“确定”
  if (userConfirmed) {
    console.log("用户选择了确定，继续执行操作。");
    // 1、读取所有表格名称
    const tableIds = await getTableIdByName();
    console.log(`tableIds: `, tableIds);

    // 2、清空表格
    for(const tableId of tableIds){
      const table = await bitable.base.getTableById(tableId);
      const recordIdList = await table.getRecordIdList();
      console.log('recordIdList=', recordIdList);
      if(recordIdList.length > 0){
        await table.deleteRecords(recordIdList);
      }
      console.log('clear table finished, table=', table);
    }
    alert('已清空所有表格');
  } else {
    console.log("用户选择了取消，取消当前操作。");
    // 取消当前操作
  }


})
