const BaseModel = require('./BaseModel.cjs');
const objectionUnique = require('objection-unique');

const unique = objectionUnique({ fields: ['name'] });

module.exports = class Label extends unique(BaseModel) {
		static get tableName() {
				return 'labels';
		}

		static get jsonSchema() {
				return {
						type: 'object',
						required: ['name'],
						properties: {
								id: { type: 'integer' },
								name: { type: 'string', minLength: 1 },
						},
				};
		}

		static get relationMappings() {
				return {
						task: {
								relation: BaseModel.BelongsToOneRelation,
								modelClass: 'Task.cjs',
								join: {
										from: 'tasksLabels.taskId',
										to: 'tasks.id',
								},
						},
						label: {
								relation: BaseModel.BelongsToOneRelation,
								modelClass: 'TaskLabels.cjs',
								join: {
										from: 'tasksLabels.labelId',
										to: 'labels.id',
								},
						},
				};
		}
};
