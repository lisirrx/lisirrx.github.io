---
title: "Inc Index"
date: 2023-07-28T22:36:36+08:00
categories: ["research notes"]
draft: false
---

> 构造索引是否能分摊为小的batch，分摊到每次compaction过程中？

	1. 索引本身是否支持增量构造（或者合并）
	2. rebuild index是否能只影响一部分数据->不接受rebuild全量数据
	3. 



### IVF

FAISS IVF Merge 可以合并多个Index
但是前提：centroid一致

传统KMeans
  
1. 随机选择 k 个点作为初始聚类中心。
2. 将所有点分配到最近的聚类中心。
3. 对于每个聚类，计算其质心。
4. 将每个聚类的质心作为新的聚类中心。
5. 重复步骤 2-4，直到聚类中心不再发生变化或达到预定的迭代次数

Continuous k-Means
1. 随机选择 k 个点作为初始聚类中心。
2. 将所有数据点分配到最近的聚类中心。
3. 对于每个聚类，计算其质心。
4. 随机选择一小部分数据点，计算它们到所有聚类中心的距离
5. 如果某个数据点到另一个聚类中心更近，则将其从当前聚类中心中删除，并将其分配到更近的聚类中心。
6. 重复步骤 3-5，直到聚类中心不再发生变化或达到预定的迭代次数。

结论：
1. 如果不重新生成，那么增加只需要插入/更新centroid的ivflist
2. 如果需要重新生成，几乎要修改所有ivflist
3. 从零开始插入数据，分布一定是不均的->一定要重新聚类

## GraphBased(HNSW)

![[HNSW_Insert_.png]]

结论：
1. 基于图构造的过程就是天然渐进式的过程
2. 可以把构造边的过程转化为KV增删的语义
3. 每次写入新节点都要有一次查询
	1. 把建边流程后推到flush过程中

1. DiskANN Graph Merge
2. Design: insert into memtable /search
3. HNSW insert in Flush 
4. L0 buffer? Compaction

baseline
hybird

```
|src1_dst1|is_valid|
|src1_dst2|is_valid|
|src1_dst3|is_valid|
...
|src2_dst1|is_valid|
...
```





