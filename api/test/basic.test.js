import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { expect } from 'chai'

dotenv.config({
    path: path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        '../../.env'
    )
})


console.log('basic.test.js suoritetaan')

describe('Movies API', function () {
    it('palauttaa elokuvalistan', async function () {
        const response = await fetch('http://localhost:3000/api/movies')

        expect(response.status).to.equal(200)

        const movies = await response.json()

        expect(movies).to.be.an('array')
    })
})

describe ('Top 5 rated elokuvat API', function () {
    it('palauttaa top 5 elokuvalistan', async function () {
        const response = await fetch('http://localhost:3000/api/movies/top-rated')
        expect(response.status).to.equal(200)
        const topRatedMovies = await response.json()
        expect(topRatedMovies).to.be.an('array')
    })
})

describe('Lisää suosikkeihin ilman tokenia', function () {
    it('palauttaa 401 Unauthorized', async function () {
        const response = await fetch('http://localhost:3000/api/favourites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tmdbId: 123,
                title: 'Test Movie',
                posterPath: '/test.jpg',
                releaseDate: '2023-01-01'
            })
        })
        expect(response.status).to.equal(401)
    })
})