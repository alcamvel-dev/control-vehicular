const handleLogin = async () => {

  const { data, error } = await supabase.auth.signInWithPassword({

    email,
    password,

  })

  if (error) {

    return alert(error.message)

  }

  const userId = data.user.id

  console.log('USER ID:', userId)

  const { data: usuarios, error: userError } = await supabase
    .from('usuarios')
    .select('*')
    .eq('auth', userId)

  console.log('USUARIOS:', usuarios)

  if (userError || !usuarios || usuarios.length === 0) {

    return alert('Usuario sin permisos')

  }

  const usuario = usuarios[0]

  if (usuario.rol === 'admin') {

    router.push('/admin')
    return

  }

  if (usuario.rol === 'cliente') {

    router.push('/portal')
    return

  }

  alert('Rol no válido')

}