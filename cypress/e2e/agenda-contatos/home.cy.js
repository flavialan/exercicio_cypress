/// <reference types = "cypress" />

describe('Testes para agenda de contatos', () => {
    beforeEach(() => {
        cy.visit('https://agenda-contatos-react.vercel.app/')
    })

    it('Deve incluir novo contato', () => {
        cy.get('[type="text"]').type('Flavia Lopes')
        cy.get('[type="email"]').type('flavialopes@teste.com')
        cy.get('[type="tel"]').type('111234567')
        cy.get('.adicionar').click()

        //Garante que os 3 inputs foram incluidos e o novo contato contem o nome Flavia Lopes
        cy.get('input').should('have.length', 3)
        cy.get('h2').should('contain.text', '4 contatos na agenda')

        cy.screenshot('teste-incluir')
    })

    it('Deve alterar contato', () => {
        cy.get('.contato').last()
        cy.get(':nth-child(5) > .sc-gueYoa > .edit').click()
        cy.get('[type="text"]').clear().type('Teste teste')
        cy.get('[type="email"]').clear().type('test@teste.com')
        cy.get('[type="tel"]').clear().type('111234567')
        cy.get('.alterar').click()

        //Garante que o contato foi alterado
        cy.visit('https://agenda-contatos-react.vercel.app/')
        cy.get('.contato').last().should('contain.text', 'Teste teste')

        cy.screenshot('teste-alterar')
    })

    it('Deve cancelar alteracao', () => {
        cy.get('.contato').last()
        cy.get(':nth-child(5) > .sc-gueYoa > .edit').click()
        cy.get('[type="text"]').clear().type('Teste teste')
        cy.get('[type="email"]').clear().type('test@teste.com')
        cy.get('[type="tel"]').clear().type('111234567')
        cy.get('.cancelar').click()

        //Garante que o contato permaneceu o mesmo
        cy.visit('https://agenda-contatos-react.vercel.app/')
        cy.get('.contato').last().should('contain.text', 'Teste teste')

        cy.screenshot('teste-cancelar-alteracao')
    })

    it('Deve excuir contato', () => {
        cy.get('.contato').last()
        cy.get(':nth-child(5) > .sc-gueYoa > .delete').click()

        //Garante que o ultimo contato seja Felipe Lacerda
        cy.visit('https://agenda-contatos-react.vercel.app/')
        cy.get('h2').should('contain.text', '3 contatos na agenda')

        cy.screenshot('teste-excluir')
    })
})