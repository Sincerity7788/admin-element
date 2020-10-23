<template>
    <div>
        <el-container style="position:absolute;top:55px;right:0px;left:0px;bottom:0px">
            <el-header class="d-flex align-items-center">
                <div class="d-flex mr-auto">
                    <el-select placeholder="请选择" style="width:150px" 
                    v-model="selectForm.order"
                    class="mr-3" size="small">
                        <el-option
                        size="small"
                        value="选项1">
                        </el-option>
                    </el-select>
                    <el-input style="width:200px" v-model="selectForm.keyword" class="mr-3" size="small"></el-input>
                    <el-button type="success" size="small">搜索</el-button>
                </div>
                <el-button type="success" size="small" @click="createAlbums">创建相册</el-button>
                <el-button type="warning" size="small" @click='dialogVisible = true'>上传图片</el-button>
            </el-header>
            <el-container>
                <el-aside width="200px" class="bg-white border-rigth"
                style="position:absolute;left:0;top:60px;bottom:60px">
                    <!-- 侧边栏 -->
                    <ul class="list-group list-group-flush">
                        <imageItem v-for="( item, index ) in albums" :key='index' 
                        :item = 'item' :index = 'index' :active = 'index === albumIndex'
                        @change = "albumChange"
                        @edit = 'openAlbumModel'
                        @del = 'albumDelete'
                         />
                    </ul>
                </el-aside>
                <el-container>
                <el-main style="position:absolute;right:0;top:60px;left:200px;bottom:60px">
                    <!-- 主内容 -->
                    <el-row :gutter='10'>
                        <el-col :span='24' :lg='4' :md='6' :sm='8' 
                        v-for="(item, index) in imageList" :key='item.id' class="mb-2">

                            <el-card class="box-card position-relative" shadow='hover'
                            style='cursor:pointer'
                            :body-style="{ 'padding': '0' }" >
                            <div class="border" :class="{'border-danger': item.is_click}">
                                <span class="badge badge-danger"  style="position:absolute;top:0;right:0"
                                v-if="item.is_click" >{{ item.checkOrder }}</span>
                                <img :src="item.src" @click='choose(item,index)'
                                class="w-100" style='height:100px' alt="">
                                <div class="w-100 text-white px-1" 
                                style="background-color:rgba(0,0,0,.4);position: absolute;
                                margin-top:-25px">
                                <span class="small">{{ item.name }}</span>
                                </div>
                                <div class="p-2 text-center">
                                    <el-button-group>
                                        <el-button  icon="el-icon-view" @click="viewImgbig(item.src)" size="mini"></el-button>
                                        <el-button  icon="el-icon-edit" 
                                        @click='editImageName( item )'
                                        size="mini"></el-button>
                                        <el-button  icon="el-icon-delete"
                                        @click=" delImage( index )"
                                         size="mini"></el-button>
                                    </el-button-group>
                                </div>
                            </div>
                                
                            </el-card>
                        </el-col>
                    </el-row>
                </el-main>
                   
                </el-container>
            </el-container>
            <el-footer>Footer</el-footer>

        </el-container>
        <!-- 修改相册 | 创建相册 -->
        <el-dialog
            title="修改相册信息"
            :visible.sync="albumsIsOpen"
            width="50%">
            <el-form ref="form" :model="modelForm" >
                <el-form-item label="相册名称">
                    <el-input style="width:60%" v-model="modelForm.name"></el-input>
                </el-form-item>
                <el-form-item label="相册排序">
                     <el-input-number v-model="modelForm.order" :min="0" 
                     ></el-input-number>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="albumsIsOpen = false">取 消</el-button>
                <el-button type="primary" @click="confirmBtn">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 上传图片 -->
        <el-dialog
            title="上传图片"
            :visible.sync="dialogVisible"
            width="40%">
           <div class="text-center">
                <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
           </div>
        </el-dialog>

         <el-dialog
            :visible.sync="viewVisible"
            width="40%" top='10vh' >
           <div style="margin:-60px -20px -30px">
               <img :src="imageSrc"
               class="w-100" style="height:100%" alt="">
           </div>
        </el-dialog>
    </div>
</template>

<script>
// 导入image组件
import imageItem from '@/components/image/index.vue'
    export default{
        components:{
            imageItem
        },
        data: () => ({
            selectForm: {
                order: '',
                keyword:''
            },
            albums:[],// 图片列表数据
            albumIndex: 0,// 图表列表默认选中下标
            albumsIsOpen: false,// 修改相册模态框是否展示
            albumsEditIndex: -1,// 当前修改的下标
            modelForm:{// 修改相册模态框数据
                name:'',
                order:''
            },
            dialogVisible: false,// 上传图片模态框状态
            viewVisible: false,// 预览图片模态框状态
            imageList:[],// 右侧图片列表数据
            imageSrc: '',// 查看大图的地址
            chooseImageList: [],// 选中的图片的信息
            
        }),
        created(){
            this.__init()
        },
        methods:{
            __init(){
                for ( let i = 0; i < 20; i++ ) {
                    this.albums.push({
                        name:'相册' + i,
                        num: Math.floor( Math.random() * 100 ),
                        order: Math.floor( Math.random() * 100 ),
                    })
                }
                // 创建图片列表
                for ( let i = 0; i < 20; i++ ) {
                    this.imageList.push({
                        id:i,
                        name: '图片' + i,
                        src:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1869534441,1252275500&fm=26&gp=0.jpg',
                        is_click: false,
                        checkOrder: 0
                    })
                }
            },
            // 点击相册列表的事件
            albumChange( index ){
                this.albumIndex = index
            },
            // 删除相册列表
            albumDelete(index){
                this.$alert('是否删除该相册', '温馨提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        if( action === 'confirm' ){
                            // 确定事件
                            this.albums.splice( index, 1 );
                            this.$message({
                            type: 'success',
                            message: `删除成功`
                            });
                        }
                        
                    }})
                // 
            },
            // 修改相册信息
            openAlbumModel( obj ){
                // 判断当前obj是否有值
                if ( obj ) {
                    let { item, index } = obj;
                    // 给当前模态框内容赋值
                    this.modelForm.name = item.name;
                    this.modelForm.order = item.order;
                    this.albumsEditIndex = index;
                    // 打开模态框
                    return this.albumsIsOpen = true
                }
                // 创建
                this.modelForm.name = '';
                this.modelForm.order = 0;
                this.albumsEditIndex = -1;
                this.albumsIsOpen = true;
            },
            // 修改或者创建相册模态框确定按钮方法
            confirmBtn(){
                // 判断当前是创建还是修改
                if( this.albumsEditIndex > -1 ){
                    // 修改
                    this.albumsEdit();
                    return this.albumsIsOpen = false;
                }
                // 创建
                this.albums.unshift({
                    name: this.modelForm.name,
                    num: 0,
                    order: this.modelForm.order,
                })
                 this.albumsIsOpen = false;
            },
            // 需改相册内容
            albumsEdit(){
                // 修改当前相册信息
                this.albums[this.albumsEditIndex].name = this.modelForm.name;
                this.albums[this.albumsEditIndex].order = this.modelForm.order;
                // 清空修改默认值
                this.modelForm.name = '';
                this.modelForm.order = '';
            },
            // 创建相册
            createAlbums(){
                // 修改当前相册的修改下标
                this.albumsEditIndex = -1;
                // 开启模态框
                this.albumsIsOpen = true;
            },
            // 预览图片
            viewImgbig(src){
                this.viewVisible = true;
                this.imageSrc = src;
            },
            // 修改图片名称
            editImageName( item ){
                 this.$prompt('请输入图片名称', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue: item.name,
                    inputValidator( value ){
                        if( value === '' ){ return '请输入正确的图片名称' }
                    },
                    }).then(({ value }) => {
                        item.name = value
                        this.$message({
                            type: 'success',
                            message: '修改成功' 
                        });
                    })    
            },
            // 删除图片
            delImage( index ){
                this.$confirm('此操作将永久删除该图片，是否继续?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        // 删除图片
                        this.imageList.splice(index,1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                })
            },
            // 选中图片
            choose(item, index){
                // 判断当前是否选中过
                if( !item.is_click ){
                    this.chooseImageList.push( { id: item.id, src: item.src, index } );
                    item.checkOrder = this.chooseImageList.length;
                    item.is_click = !item.is_click;
                    return 
                }
                let i = this.chooseImageList.findIndex( v => v.id === item.id );
                if( i === -1 ) { return }
                // 重新计算序号
                let length = this.chooseImageList.length;
                // 取消选中中间部分
                if( i + 1 < length ){
                    // 重新计算imageList
                    for( let j = i; j < length; j++ ){
                        let no = this.chooseImageList[j].index 
                        if( no > -1 ){
                            this.imageList[no].checkOrder--
                        }
                    }
                }

                // 删除选中列表中的数据
                this.chooseImageList.splice(i,1);
               // 将当前这个状态改成未点击
               item.is_click = false;
               // 将排序改为0
               item.checkOrder = 0;
            }
        }
    }
</script>

<style>
.sum-active{
    color: #67c23a !important;
    background-color: #f0f9eb !important;
    border-color: #c2e7b0 !important;
}
</style>


