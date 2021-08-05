import { Str } from "../helpers/Str";

const mysql = require('mysql'); 
const dbConfig = require('../config/database');


/**
 * Author: Peter Erhunmwunse
 * Description: A mini Base model for database crud
 * Date Created: 29/08/2021
 */
class BaseModel {
    protected table: string = "";
    protected limit: number = -1;
    protected selectedFields = "*";
    protected whereCondition = "";

    constructor() {
        this._initialize();
    }
    private _buildWhereStatement(field: string, operator: string, value: string, conditionOperator: string) {
        //Clean white spaces
        field = field.trim();
        operator = operator.trim();
        conditionOperator = conditionOperator.trim();

        //Raise error on empty argument values
        if (field.length === 0 || operator.length === 0 || value.length === 0) {
            throw new Error("Empty argument value not allowed");
        }

        //Build where conditional statement
        if (this.whereCondition.length === 0) {
            this.whereCondition = "WHERE ";
        }
        else {
            this.whereCondition += `${conditionOperator}`;
        }

        this.whereCondition = `${this.whereCondition} ${field} ${operator} '${value}' `;
    }
    private _resolveTableName(): string {
        //Table name given by derive class
        if (this.table.length !== 0)
            return this.table;

        //Table name not given, so it should be derived from class name
        let className = this.constructor.name;

        return Str.snake(Str.pluralStudly(className)); //convert string to snake case and pluralize
    }
    private _initialize() {
        this.table = this._resolveTableName();
    }
    protected query(queryStr: string, callback: (res: unknown) => void) {
        const conn = this.getConnection();
        conn.connect(function(err: any) {
            if (err) throw err;
            conn.query(queryStr, function (err: any, result: any) {
              if (err) throw err;
              conn.end();
              callback(result);
            });
        });
    }
    protected getConnection() {
        const connection = mysql.createConnection({
            database: dbConfig.NAME,
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD
        });

        return connection;
    }
    public get(callback : (res: unknown) => void) {
        let queryStr = `   
            SELECT ${this.selectedFields} 
            FROM ${this.table} 
            ${this.whereCondition}
            ${this.limit === -1? '' : 'limit ' + this.limit}
        `;
        
        return this.query(
            queryStr,
            callback
        );
    }
    public take(limit: number) {
        this.limit = limit;
        return this;
    }
    public select(fields: string[]) {
        if (fields.length === 0) throw new Error("Empty field list");

        this.selectedFields = fields.join();

        return this;
    }
    public where(field: string, operator: string, value: string) {
        return this.andWhere(field, operator, value);
    }
    public andWhere(field: string, operator: string, value: string) {
        this._buildWhereStatement(field, operator, value, 'AND');
        return this;
    }
    public orWhere(field: string, operator: string, value: string) {
        this._buildWhereStatement(field, operator, value, 'OR');
        return this;
    }
    public insert() {
        //Not implemented yet
    }
}

export default BaseModel;