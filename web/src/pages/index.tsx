import Image from 'next/image'

import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import avatarUserExampleImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'

import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

interface responseApiCreatePools {
  code: string
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post<responseApiCreatePools>('/pools', {
        title: poolTitle
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)
      setPoolTitle('')
      
      alert('Erro ao criar bolão')
    } catch {
      alert('Erro ao criar bolão')
    }
  }

  return (
    <div className='max-w-xl lg:max-w-[1124px] h-screen mx-auto grid lg:grid-cols-2 gap-28 items-center my-12 px-4 xl:px-0'>
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className='mt-10 flex flex-col sm:flex-row items-center gap-2'>
          <Image src={avatarUserExampleImg} alt="" />

          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{props.userCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className='mt-10 flex gap-2 items-center'>
          <input
            onChange={event => setPoolTitle(event.target.value)}
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100'
            type="text"
            placeholder='Qual o nome do seu bolão?'
            value={poolTitle}
          />

          <button
            className='bg-yellow-500 px-6 py-4 rounded text-gray-900 text-sm font-bold uppercase transition-colors hover:bg-yellow-700'
            type='submit'
          >
            Criar bolão
          </button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas
        </p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex flex-wrap justify-between'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />

            <div className='flex flex-col items-center text-gray-100'>
              <span className='text-2xl font-bold'>+{props.poolCount}</span>
              <p>bolões criados</p>
            </div>
          </div>

          <div className='w-px min-h-full bg-gray-600' />

          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />

            <div className='flex flex-col items-center text-gray-100'>
              <span className='text-2xl font-bold'>+{props.guessCount}</span>
              <p >Palpites enviados</p>
            </div>
          </div>
        </div>
      </main>

      <Image className='hidden lg:block' quality={100} src={appPreviewImg} alt="Dois celulares exibindo uma previa da aplicação mobile do NLW Copa" />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [
    poolCountResponse,
    guessCountResponse,
    userCountResponse
  ] = await Promise.all([
    api.get('http://localhost:3333/pools/count'),
    api.get('http://localhost:3333/guesses/count'),
    api.get('http://localhost:3333/users/count')
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    }
  }
}