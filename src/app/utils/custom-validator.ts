import { FormControl, FormGroup, FormArray } from '@angular/forms';

export const CustomValidator = {

    CPFValidator : function(c: FormControl){  
          let value = c.value;        
          if(VerificaCPF(c.value || "")) {
                return null;
          } 
          else if(c.value){
               return { validCPF: true }
               
          }
          else{
                return { validCPF: false }
          }             
    },

        CNPJValidator : function(c: FormControl){  
          let value = c.value;        
          if(VerificaCNPJ(c.value || "")) {
                return null;
          } 
          else if(c.value){
               return { validCNPJ: true }
               
          }
          else{
                return { validCNPJ: false }
          }             
    },

    MinValue : (Value)=>{
      return (c: FormControl) => {  
          if(c.value){
                let value = c.value.replace(/[^0-9]+/ig, "");
                value = Number(value);
                if(value >= Value) {
                      return null;
                }           
                else{
                      return { minvalue: true }
                }   
          }     
          else{
            return { minvalue: true }
          }     
       }
    },

    DateValidator: (c: FormControl) => {
      let date = new Date();
      if(/^\d{2}\/\d{2}\/\d{4}$/.test(c.value) && isValidDate(c.value)){          
          return null;
      }
      else if (c.value){
          return  { dateValid: true} 
      } 
      else { return  { dateValid: false} }
    }    
}


function VerificaCPF(CPF: any) {
        
        if(CPF.length<11)
            return false;
            
        let cpf = CPF.replace(/[\D]/ig,"");
        var soma: any;
        var resto: any;
        soma = 0;
       
       
       var numeros: any, digitos: any, soma: any, i: any, resultado: any, digitos_iguais: any;
        digitos_iguais = 1;
        if (cpf.length < 11)
              return false;
        for (i = 0; i < cpf.length - 1; i++)
              if (cpf.charAt(i) != cpf.charAt(i + 1))
                    {
                    digitos_iguais = 0;
                    break;
                    }
        if (!digitos_iguais)
              {
              numeros = cpf.substring(0,9);
              digitos = cpf.substring(9);
              soma = 0;
              for (i = 10; i > 1; i--)
                    soma += numeros.charAt(10 - i) * i;
              resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
              if (resultado != digitos.charAt(0))
                    return false;
              numeros = cpf.substring(0,10);
              soma = 0;
              for (i = 11; i > 1; i--)
                    soma += numeros.charAt(11 - i) * i;
              resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
              if (resultado != digitos.charAt(1))
                    return false;
              return true;
              }
        else
            return false;
}
function VerificaCNPJ(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    let tamanho:any = cnpj.length - 2
    let numeros:any = cnpj.substring(0,tamanho);
    let digitos:any = cnpj.substring(tamanho);
    let soma:any = 0;
    let pos:any = tamanho - 7;
    let i:any;

    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}
function isValidDate(s: any) {
  var bits = s.split('/');
  var d = new Date(bits[2], bits[1] - 1, bits[0]);
  return d && (d.getMonth() + 1) == bits[1] && d.getFullYear() > 1920;
}