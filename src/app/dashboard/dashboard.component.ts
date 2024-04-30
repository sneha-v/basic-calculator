import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  number = '0';
  operator: string = "";
  waitForNextOperand = false;
  operand: number = 0;
  hasFirstOperand = false;


  setNumber (value: string) {
    if (this.waitForNextOperand) {
      this.number = value;
      this.waitForNextOperand = false;
    }
    else if (this.number === '0') {
      this.number = value;
    }
    else {
      this.number += value;
    }
  }

  setDecimal () {
    if (!this.number.includes('.')){
      this.number += '.';
    }
  }

  calculate (op:string, secondOperand:number) {
    switch (op){
      case '+':
      return this.operand += secondOperand; 
      case '-': 
      return this.operand -= secondOperand; 
      case '*': 
      return this.operand *= secondOperand; 
      case '/': 
      return this.operand /= secondOperand; 
      case '=':
      return secondOperand;
    }
    return secondOperand;
  }

  setOperation (op: string) {
    if(!this.hasFirstOperand){
      this.operand = Number(this.number);
      this.hasFirstOperand = true;
    }
    else if(this.operator) {
      const result = this.calculate(this.operator, Number(this.number));
      this.number = String(result);
      this.operand = result;
    }
    this.operator = op;
    this.waitForNextOperand = true;
  }

  clear() {
    this.number = '0';
    this.operator = "";
    this.waitForNextOperand = false;
    this.operand = 0;
    this.hasFirstOperand = false;
  }

  toggleSign() {
    this.number = String(Number(this.number) * -1);
    
  }
  calculatePercent() {
    this.number = String(Number(this.number) / 100);
  }
}
