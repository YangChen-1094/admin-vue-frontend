<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="24">
				<el-card shadow="hover" class="mgb20" style="height:252px;">
					<div class="user-info">
						<img src="../../assets/img/img.jpg" class="user-avator" alt />
						<div class="user-info-cont">
							<div class="user-info-name">{{name}}</div>
							<div>{{role}}</div>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'Dashboard',
		data() {
			return {
				name: "",
				role: "",
			};
		},
		created() {
			this.name = localStorage.getItem('ms_username');
			this.role = this.name=='admin' ||this.name=='test' ? '超级管理员' : '普通用户';

		},

		methods: {

		}
	};
</script>


<style scoped>
	.grid-con-1 .grid-con-icon {
		background: rgb(45, 140, 240);
	}

	.grid-con-1 .grid-num {
		color: rgb(45, 140, 240);
	}

	.grid-con-2 .grid-con-icon {
		background: rgb(100, 213, 114);
	}

	.grid-con-2 .grid-num {
		color: rgb(45, 140, 240);
	}

	.grid-con-3 .grid-con-icon {
		background: rgb(242, 94, 67);
	}

	.grid-con-3 .grid-num {
		color: rgb(242, 94, 67);
	}

	.user-info {
		display: flex;
		align-items: center;
		padding-bottom: 20px;
		border-bottom: 2px solid #ccc;
		margin-bottom: 20px;
	}

	.user-avator {
		width: 120px;
		height: 120px;
		border-radius: 50%;
	}

	.user-info-cont {
		padding-left: 50px;
		flex: 1;
		font-size: 14px;
		color: #999;
	}

	.user-info-cont div:first-child {
		font-size: 30px;
		color: #222;
	}
	.user-info-list span {
		margin-left: 70px;
	}
</style>
