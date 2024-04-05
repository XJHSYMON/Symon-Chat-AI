// 分类：获取文章分类
import request from '@/utils/request.js'
export const artGetChannelsService = () => {
  return request.get('/my/cate/list')
}
// 分类:添加文章分类
export const artAddChannelsService = (data) => {
  return request.post('/my/cate/add', data)
}
// 分类：更新文章分类
export const artEditChannelsService = (data) => {
  return request.put('/my/cate/info', data)
}
// 分类：删除文章
export const artDeleteChannelsService = (id) => {
  return request.delete('/my/cate/del', { params: { id } })
}
// 文章：获取文章列表
export const artGetListService = (params) => {
  return request.get('/my/article/list', { params })
}
//文章：发布文章 (是以data-form格式)
export const artPublishService = (data) => {
  return request.post('/my/article/add', data)
}

//文章：获取文章内容
export const artGetDetailService = (id) => {
  return request.get('/my/article/info', { params: { id } })
}

//文章：更新文章内容
export const artEditService = (data) => {
  return request.put('/my/article/info', data)
}
