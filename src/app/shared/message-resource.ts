export class MessageResource{
    public messages: { [key: string]: { [key: string]: string } };
    public routes: { [key: string]: { [key: string]: string } };
    public titles: { [key: string]: { [key: string]: string } };
    
    constructor(){

        this.messages = { 
            SHARED: {
                MSG_SAVE_SUCCESS: 'Salvo com sucesso!' ,
                MSG_FAIL_OPERATION: 'Falha ao realizar operação!',
                MSG_SAVING: 'Salvando...',
                MSG_LOADING: 'Carregando...',
                MSG_LISTING: 'Listando...',
                MSG_SENDING: 'Enviando...',
                MSG_CONFIRMING: 'Confirmando...',
                LOGIN: 'Efetuando Login...' 
            },
            APARTAMENTO: {
                NUMERO_REQUIRED: 'Número do apartamento requerido.' ,
                EDIFICIO_REQUIRED: 'Informe o edifício.',
                MORADOR_REQUIRED: 'Informe o morador.',
                PERCENTUAL_REQUIRED: 'Percentual inválido.',
                PERCENTUAL_RANGE: 'O percentual deve ser entre 1 e 100' 
            },
            CENTRO_CUSTO: {
                NOME_REQUIRED: 'Nome requerido.' ,
                NOME_MIN_LENGTH: 'O Nome precisa ter no mínimo 2 caracteres.',
                NOME_MAX_LENGTH: 'O Nome precisa ter no máximo 150 caracteres.' 
            },
            CLIENTE: {
                NOME_REQUIRED: 'Nome requerido.' ,
                NOME_MIN_LENGTH: 'O Nome precisa ter no mínimo 2 caracteres.',
                NOME_MAX_LENGTH: 'O Nome precisa ter no máximo 150 caracteres.' 
            },
            FORNECEDOR: {
                NOME_REQUIRED: 'Nome requerido.' ,
                NOME_MIN_LENGTH: 'O Nome precisa ter no mínimo 2 caracteres.',
                NOME_MAX_LENGTH: 'O Nome precisa ter no máximo 150 caracteres.' 
            },
            DESPESA: {
                FORNECEDOR_REQUIRED: 'Fornecedor requerido.' ,
                CENTRO_CUSTO_REQUIRED: 'Centro de custo requerido.',
                DATA_VENCIMENTO_REQUIRED: 'Data de vencimento requerida.' ,
                VALOR_DESPESA: 'Valor requerido.'
            },
            RECEBIMENTO: {
                TIPO_RECEBIMENTO_REQUIRED: 'Tipo recebimento requerido.' ,
                CENTRO_CUSTO_REQUIRED: 'Centro de Custo requerido.',
                DATA_VENCIMENTO_REQUIRED: 'Data de vencimento requerida.',
                VALOR_RECEBIMENTO_REQUIRED: 'Valor requerido.',
                VALOR_TAXA_EXTRA_INVALID: 'Valor taxa extra inválido.', 
            },
            EDIFICIO: {
                NOME_REQUIRED: 'Nome requerido.',
                NOME_MIN_LENGTH: 'O Nome precisa ter no mínimo 2 caracteres.',
                NOME_MAX_LENGTH: 'O Nome precisa ter no máximo 150 caracteres.',
                CNPJ_REQUIRED: 'CNPJ requerido.',
                CNPJ_MIN_LENGTH: 'O CNPJ precisa ter 14 caracteres.',
                CNPJ_MAX_LENGTH: 'O CNPJ precisa ter 14 caracteres.',
                CNPJ_INVALID: 'CNPJ inválido.',
                LOGRADOURO_REQUIRED: 'Logradouro requerido.',
                LOGRADOURO_MIN_LENGTH: 'O logradouro precisa ter no mínimo 2 caracteres.',
                LOGRADOURO_MAX_LENGTH: 'O logradouro precisa ter no máximo 150 caracteres.',
                NUMERO_REQUIRED: 'Número requerido.',
                NUMERO_MIN_LENGTH: 'O número precisa ter no mínimo 2 caracteres.',
                NUMERO_MAX_LENGTH: 'O número precisa ter no máximo 20 caracteres.',
                BAIRRO_REQUIRED: 'Bairro requerido.',
                BAIRRO_MIN_LENGTH: 'O bairro precisa ter no mínimo 2 caracteres.',
                BAIRRO_MAX_LENGTH: 'O bairro precisa ter no máximo 100 caracteres.',
                CIDADE_REQUIRED: 'Cidade requerida.',
                CIDADE_MIN_LENGTH: 'A cidade precisa ter no mínimo 2 caracteres.',
                CIDADE_MAX_LENGTH: 'A cidade precisa ter no máximo 100 caracteres.',
                CEP_REQUIRED: 'CEP requerido.',
                CEP_MIN_LENGTH: 'O CEP precisa ter 8 caracteres.',
                CEP_MAX_LENGTH: 'O CEP precisa ter 8 caracteres.',
                UF_REQUIRED: 'UF requerida.'
            },
            RECUPERAR_SENHA: {
                EMAIL_REQUIRED: 'Informe o e-mail.',
                EMAIL_INVALID: 'Email inválido.'
            },
            ALTERAR_SENHA: {
                SENHA_ATUAL_REQUIRED: 'Informe a senha atual.',
                SENHA_ATUAL_MIN_LENGTH: 'A senha atual deve possuir no mínimo 6 caracteres.',
                SENHA_NOVA_REQUIRED: 'Informe a senha.',
                SENHA_NOVA_MIN_LENGTH: 'A senha deve possuir no mínimo 6 caracteres.',
                SENHA_CONFIRME_REQUIRED: 'Informe a senha novamente.',
                SENHA_CONFIRME_MIN_LENGTH: 'A senha deve possuir no mínimo 6 caracteres.',
                SENHA_CONFIRME_EQUAL_TO: 'As senhas não conferem.'
            },
            CONFIRM_EMAIL: {
                EMAIL_CONFIRMED_SUCCESS: 'E-mail confirmado com sucesso.'
            },
            USUARIO: {
                NOME_REQUIRED: 'Nome requerido.' ,
                NOME_MIN_LENGTH: 'O Nome precisa ter no mínimo 2 caracteres.',
                NOME_MAX_LENGTH: 'O Nome precisa ter no máximo 150 caracteres.',
                CPF_CNPJ_REQUIRED: 'CPF/CNPJ requerido.',
                CPF_INVALID: 'CPF inválido.',
                CNPJ_INVALID: 'CNPJ inválido.',
                TIPO_USUARIO_REQUIRED: 'Tipo usuário requerido.',
                TIPO_PESSOA_REQUIRED: 'Tipo pessoa requerido.',
                EMAIL_REQUIRED: 'Informe o e-mail.',
                EMAIL_INVALID: 'Email invalido.' 
            }
        };

        this.routes = { 
            APARTAMENTO: {
                LISTAR: '/apartamento/listar' },
            CENTRO_CUSTO: {
                LISTAR: '/centrocusto/listar' 
            },
            CLIENTE: {
                LISTAR: '/cliente/listar' 
            },
            DESPESA: {
                LISTAR: '/despesa/listar' 
            },
            EDIFICIO: {
                LISTAR: '/edificio/listar' 
            },
            FORNECEDOR: {
                LISTAR: '/fornecedor/listar' 
            },
            RECEBIMENTO: {
                LISTAR: '/recebimento/listar' 
            },
            LOGIN: {
                ENTRAR: '/login/entrar' 
            },
            HOME: {
                INICIAL: '/home/inicial'
            }
        };

        this.titles = { 
            APARTAMENTO: {
                TITLE_UPDATE: 'Atualizar Apartamento',
                TITLE_NEW: 'Novo Apartamento',
                TITLE_LIST: 'Apartamentos' 
            },
            CENTRO_CUSTO: {
                TITLE_UPDATE: 'Atualizar Centro de Custo',
                TITLE_NEW: 'Novo Centro de Custo',
                TITLE_LIST: 'Centros de Custo' 
            },
            CLIENTE: {
                TITLE_UPDATE: 'Atualizar Cliente',
                TITLE_NEW: 'Novo Cliente',
                TITLE_LIST: 'Clientes' 
            },
            DESPESA: {
                TITLE_UPDATE: 'Atualizar Despesa',
                TITLE_NEW: 'Novo Despesa',
                TITLE_LIST: 'Despesas' 
            },
            EDIFICIO: {
                TITLE_UPDATE: 'Atualizar Edifício',
                TITLE_NEW: 'Novo Edifício',
                TITLE_LIST: 'Edifícios' 
            },
            FORNECEDOR: {
                TITLE_UPDATE: 'Atualizar Fornecedor',
                TITLE_NEW: 'Novo Fornecedor',
                TITLE_LIST: 'Fornecedores' 
            },
            RECEBIMENTO: {
                TITLE_UPDATE: 'Atualizar Recebimento',
                TITLE_NEW: 'Novo Recebimento',
                TITLE_LIST: 'Recebimentos',
                GERAR_BOLETOS_AP: 'Gerar Boletos Apartamentos' 
            },
            ALTERAR_SENHA: {
                TITLE: 'Alterar Senha'
            },
            USUARIO: {
                TITLE: 'Cadastrar Usuário'
            }
        };
    }
 }