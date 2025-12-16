const agentsData = {
    "Jett": {
        role: "Duelista",
        description: "Jett es una agente surcoreana ágil y evasiva. Su estilo de lucha se centra en tomar riesgos y flanquear a los enemigos con rapidez.",
        abilities: [
            { name: "Viento de Cola", desc: "Se impulsa instantáneamente en la dirección en la que se mueve." },
            { name: "Borrasca", desc: "Lanza un proyectil que se expande en una nube de humo que bloquea la visión." },
            { name: "Vendaval", desc: "Se impulsa hacia arriba en el aire." },
            { name: "Tormenta de Cuchillas", desc: "ULTIMATE: Se equipa con un conjunto de cuchillos letales que se recargan al matar." }
        ]
    },
    "Phoenix": {
        role: "Duelista",
        description: "Phoenix es un agente británico cuyo poder estelar brilla en el campo de batalla. Puede curarse con fuego y controlar el ritmo del combate.",
        abilities: [
            { name: "Combustión", desc: "Lanza una bola de fuego que explota tras un breve retardo o al golpear el suelo, creando una zona de fuego que daña enemigos y cura a Phoenix." },
            { name: "Bola Curva", desc: "Lanza una esfera de fuego que gira y ciega a los jugadores que la ven." },
            { name: "Llamarada", desc: "Crea un muro de fuego que bloquea la visión y daña a los jugadores que lo atraviesan." },
            { name: "Cenizas", desc: "ULTIMATE: Marca su ubicación actual. Si muere o el tiempo se agota, renace en la marca con toda la vida." }
        ]
    },
    "Reyna": {
        role: "Duelista",
        description: "Desde el corazón de México, Reyna llega para dominar en el uno contra uno, mejorando con cada baja que consigue.",
        abilities: [
            { name: "Devorar", desc: "Consume la esencia vital de un enemigo muerto para curarse." },
            { name: "Despreciar", desc: "Consume la esencia vital de un enemigo para volverse intangible." },
            { name: "La Mirada", desc: "Lanza un ojo etéreo que ciega a los enemigos que lo miran." },
            { name: "Emperatriz", desc: "ULTIMATE: Entra en un frenesí que aumenta drásticamente la velocidad de disparo y recarga." }
        ]
    },
    "Raze": {
        role: "Duelista",
        description: "Raze llega de Brasil con su amor por los explosivos. Con su personalidad contundente y sus grandes armas, Raze destaca al limpiar espacios estrechos.",
        abilities: [
            { name: "Fardo Explosivo", desc: "Lanza un paquete explosivo que se adhiere a las superficies y puede detonar para mover a Raze o dañar enemigos." },
            { name: "Balas de Pintura", desc: "Lanza una granada de racimo que explota y libera submuniciones." },
            { name: "Bot Explosivo", desc: "Despliega un robot que persigue a los enemigos y explota al alcanzarlos." },
            { name: "Cierratelones", desc: "ULTIMATE: Equipa un lanzacohetes que inflige un daño masivo de área." }
        ]
    },
    "Yoru": {
        role: "Duelista",
        description: "Yoru es un nativo de Japón que puede rasgar la realidad para infiltrarse en las líneas enemigas sin ser visto.",
        abilities: [
            { name: "Punto Ciego", desc: "Arranca un fragmento dimensional y lo lanza, cegando a los enemigos tras rebotar." },
            { name: "Infiltración", desc: "Envía una grieta que puede activar para teletransportarse a su ubicación." },
            { name: "Engaño", desc: "Genera un clon de sí mismo que camina hacia adelante." },
            { name: "Viaje Interdimensional", desc: "ULTIMATE: Se vuelve invisible e invulnerable al entrar en otra dimensión." }
        ]
    },
    "Neon": {
        role: "Duelista",
        description: "La agente filipina Neon avanza a velocidades impactantes, descargando ráfagas de energía bioeléctrica tan rápido como su cuerpo se lo permite.",
        abilities: [
            { name: "Explosión de Relé", desc: "Lanza un rayo de energía que rebota una vez y electrifica el suelo, aturdiendo a los enemigos." },
            { name: "A toda máquina", desc: "Canaliza su poder para aumentar su velocidad. Al deslizarse, dispara con precisión." },
            { name: "Carril Rápido", desc: "Dispara dos líneas de energía que crean muros de electricidad estática." },
            { name: "Sobrecarga", desc: "ULTIMATE: Desata todo su poder y velocidad, disparando un rayo eléctrico mortal con gran precisión de movimiento." }
        ]
    },
    "Iso": {
        role: "Duelista",
        description: "Iso es un mercenario chino que entra en estado de flujo para desmantelar a sus oponentes.",
        abilities: [
            { name: "Contingencia", desc: "Lanza un muro de energía prismática que bloquea las balas." },
            { name: "Socavar", desc: "Lanza un virote molecular que atraviesa paredes y aplica vulnerabilidad." },
            { name: "Doble Toque", desc: "Inicia un temporizador de concentración. Al matar, genera orbes que otorgan un escudo." },
            { name: "Asesinato a Sueldo", desc: "ULTIMATE: Arrastra a un enemigo a una arena interdimensional para un duelo a muerte." }
        ]
    },
    "Waylay": {
        role: "Duelista",
        description: "Waylay usa su velocidad basada en la luz para entrar en combate agresivamente, aturdiendo y flanqueando enemigos.",
        abilities: [
            { name: "Destello Veloz", desc: "Se mueve a una velocidad increíblemente rápida durante un breve periodo." },
            { name: "Prisma", desc: "Lanza un prisma que ralentiza y aturde a los enemigos cercanos." },
            { name: "Reflejo", desc: "Crea un señuelo de luz que confunde a los oponentes." },
            { name: "Velocidad de la Luz", desc: "ULTIMATE: Se convierte en luz pura, volviéndose inalcanzable y letal por unos segundos." }
        ]
    },

    "Brimstone": {
        role: "Controlador",
        description: "Brimstone, de Estados Unidos, asegura que su equipo siempre tenga ventaja con su arsenal orbital.",
        abilities: [
            { name: "Incendiario", desc: "Lanza una granada incendiaria que crea una zona de fuego." },
            { name: "Cortina de Humo", desc: "Lanza nubes de humo de larga duración que bloquean la visión." },
            { name: "Baliza Estimulante", desc: "Lanza una baliza que otorga fuego rápido a los aliados cercanos." },
            { name: "Golpe Orbital", desc: "ULTIMATE: Lanza un ataque láser orbital devastador en una ubicación seleccionada." }
        ]
    },
    "Omen": {
        role: "Controlador",
        description: "Omen caza en las sombras. Ciega a los enemigos, se teletransporta a través del campo y deja que la paranoia se apodere de sus rivales.",
        abilities: [
            { name: "Paranoia", desc: "Lanza una sombra que ciega a todos los que toca." },
            { name: "Velo Tenebroso", desc: "Lanza una esfera de sombra que se expande en una nube de humo." },
            { name: "Aparición Tenebrosa", desc: "Se teletransporta a una corta distancia." },
            { name: "Desde las Sombras", desc: "ULTIMATE: Se teletransporta a cualquier parte del mapa." }
        ]
    },
    "Viper": {
        role: "Controlador",
        description: "Viper, una química estadounidense, despliega dispositivos químicos venenosos para controlar el campo de batalla y cegar a los enemigos.",
        abilities: [
            { name: "Nube Venenosa", desc: "Lanza un emisor de gas que crea una nube tóxica." },
            { name: "Cortina Tóxica", desc: "Despliega una línea de emisores de gas para crear un muro tóxico." },
            { name: "Veneno de Serpiente", desc: "Dispara un proyectil químico que daña y ralentiza." },
            { name: "Pozo de la Víbora", desc: "ULTIMATE: Crea una nube masiva de gas tóxico que reduce la visión y la salud de los enemigos." }
        ]
    },
    "Astra": {
        role: "Controlador",
        description: "Astra, de Ghana, domina las energías del cosmos para remodelar el campo de batalla a su antojo.",
        abilities: [
            { name: "Pozo de Gravedad", desc: "Atrae a los jugadores hacia el centro y luego explota." },
            { name: "Pulso Nova", desc: "Carga brevemente y luego aturde a los jugadores en su área." },
            { name: "Nebulosa", desc: "Transforma una estrella en una nube de humo." },
            { name: "Forma Astral / Separación Cósmica", desc: "ULTIMATE: Divide el mapa con un muro que bloquea balas y sonido." }
        ]
    },
    "Harbor": {
        role: "Controlador",
        description: "Harbor, de la India, controla las mareas y torrentes de agua antigua para proteger a sus aliados.",
        abilities: [
            { name: "Marea Alta", desc: "Equipa un muro de agua que se puede dirigir y atraviesa paredes." },
            { name: "Cascada", desc: "Lanza una ola de agua que atraviesa paredes y bloquea la visión." },
            { name: "Cala", desc: "Lanza una esfera de agua que bloquea las balas." },
            { name: "Cataclismo", desc: "ULTIMATE: Invoca un géiser que aturde a los enemigos en el área." }
        ]
    },
    "Clove": {
        role: "Controlador",
        description: "Clove, agente de Escocia, utiliza la travesura y la inmortalidad para confundir a sus enemigos incluso desde el más allá.",
        abilities: [
            { name: "Treta", desc: "Lanza nubes de humo que bloquean la visión. Puede usarse tras morir." },
            { name: "Metedura de Pata", desc: "Lanza un fragmento de esencia inmortal que aplica deterioro a los enemigos." },
            { name: "Tentempié", desc: "Absorbe la fuerza vital de un enemigo caído para ganar velocidad y vida temporal." },
            { name: "Aún no he muerto", desc: "ULTIMATE: Desafía a la muerte resucitando tras caer, pero debe conseguir una baja o asistencia para permanecer viva." }
        ]
    },

    "Killjoy": {
        role: "Centinela",
        description: "La genio alemana Killjoy asegura el campo de batalla con su arsenal de inventos.",
        abilities: [
            { name: "Bot de Alarma", desc: "Despliega un bot que persigue a los enemigos y los vuelve vulnerables." },
            { name: "Torreta", desc: "Despliega una torreta que dispara a los enemigos en un cono de 180 grados." },
            { name: "Nanoenjambre", desc: "Lanza una granada que despliega un enjambre de nanobots dañinos." },
            { name: "Bloqueo", desc: "ULTIMATE: Detiene a todos los enemigos en un radio masivo." }
        ]
    },
    "Cypher": {
        role: "Centinela",
        description: "Cypher, de Marruecos, es una red de vigilancia de un solo hombre que vigila cada movimiento del enemigo.",
        abilities: [
            { name: "Cable Trampa", desc: "Coloca un cable invisible que aturde y revela a los enemigos que lo cruzan." },
            { name: "Prisión Cibernética", desc: "Lanza una trampa que crea una zona de humo y ralentiza a los enemigos." },
            { name: "Cámara Espía", desc: "Coloca una cámara remota para vigilar y marcar enemigos." },
            { name: "Hurto Neuronal", desc: "ULTIMATE: Usa un cadáver enemigo para revelar la ubicación de todos los enemigos vivos." }
        ]
    },
    "Sage": {
        role: "Centinela",
        description: "Sage, de China, es el bastión de seguridad para ella y su equipo, capaz de revivir a los caídos y frenar asaltos.",
        abilities: [
            { name: "Orbe de Ralentización", desc: "Lanza un orbe que crea un campo de ralentización." },
            { name: "Orbe de Sanación", desc: "Cura a un aliado o a sí misma." },
            { name: "Orbe Barrera", desc: "Crea un muro sólido." },
            { name: "Resurrección", desc: "ULTIMATE: Revive a un aliado muerto con toda la vida." }
        ]
    },
    "Chamber": {
        role: "Centinela",
        description: "Chamber, el diseñador de armas francés, elimina a sus enemigos con una precisión mortal.",
        abilities: [
            { name: "Marca Registrada", desc: "Coloca una trampa que escanea enemigos y crea un campo de ralentización." },
            { name: "Cazador de Cabezas", desc: "Equipa una pistola pesada." },
            { name: "Cita", desc: "Coloca un ancla de teletransporte." },
            { name: "Tour de Force", desc: "ULTIMATE: Invoca un rifle de francotirador personalizado de gran potencia." }
        ]
    },
    "Deadlock": {
        role: "Centinela",
        description: "Deadlock, operativa noruega, despliega una matriz de nanocables de alta tecnología para asegurar el campo de batalla.",
        abilities: [
            { name: "Sensor Sónico", desc: "Despliega un sensor que aturde a los enemigos si hacen ruido." },
            { name: "Malla Barrera", desc: "Lanza un disco que genera barreras radiales que bloquean el movimiento." },
            { name: "Red de Gravitas", desc: "Lanza una granada que obliga a los enemigos a agacharse y moverse lento." },
            { name: "Aniquilación", desc: "ULTIMATE: Captura a un enemigo en un capullo de nanocables y lo arrastra a su muerte." }
        ]
    },
    "Vyse": {
        role: "Centinela",
        description: "Vyse es una estratega metálica que manipula el hierro líquido para aislar y atrapar a sus enemigos.",
        abilities: [
            { name: "Trampa de Hierro", desc: "Coloca metal líquido oculto que ralentiza y daña a quienes lo pisan." },
            { name: "Muro de Acero", desc: "Levanta una barrera de metal sólido desde el suelo." },
            { name: "Jaula", desc: "Encierra a un enemigo en una prisión de metal." },
            { name: "Jardín de Acero", desc: "ULTIMATE: Inhabilita las armas principales de los enemigos en un área grande." }
        ]
    },

    // Initiators
    "Sova": {
        role: "Iniciador",
        description: "Sova rastrea, encuentra y elimina a sus enemigos con una precisión y eficiencia despiadadas.",
        abilities: [
            { name: "Proyectil de Choque", desc: "Dispara una flecha explosiva que daña a los enemigos." },
            { name: "Proyectil de Reconocimiento", desc: "Dispara una flecha que revela la ubicación de los enemigos cercanos." },
            { name: "Dron Búho", desc: "Despliega un dron pilotable que puede disparar dardos marcadores." },
            { name: "Furia del Cazador", desc: "ULTIMATE: Dispara tres ráfagas de energía que atraviesan paredes y dañan a los enemigos." }
        ]
    },
    "Breach": {
        role: "Iniciador",
        description: "Breach, el sueco biónico, dispara poderosos estallidos cinéticos para abrir paso a través del terreno enemigo.",
        abilities: [
            { name: "Réplica", desc: "Dispara una carga de fusión a través de una pared que daña a quien esté al otro lado." },
            { name: "Punto de Ebullición", desc: "Dispara una carga cegadora a través de una pared." },
            { name: "Falla", desc: "Dispara una línea sísmica que aturde a los enemigos." },
            { name: "Fragor Imparable", desc: "ULTIMATE: Envía un terremoto en cascada a través del terreno que aturde y lanza a los enemigos por los aires." }
        ]
    },
    "Skye": {
        role: "Iniciador",
        description: "Skye y su manada de bestias australianas se abren paso a través del territorio hostil.",
        abilities: [
            { name: "Luz Guía", desc: "Controla un halcón que puede detonar para cegar a los enemigos." },
            { name: "Rastreadores", desc: "Invoca un tigre de Tasmania que persigue y aturde a los enemigos." },
            { name: "Florecer", desc: "Canaliza energía para curar a los aliados en rango y línea de visión." },
            { name: "Buscadores", desc: "ULTIMATE: Envía tres buscadores que rastrean a los enemigos cercanos y les reducen la visión." }
        ]
    },
    "KAY/O": {
        role: "Iniciador",
        description: "KAY/O es una máquina de guerra construida con un único propósito: neutralizar a los radiantes.",
        abilities: [
            { name: "FRAG/mento", desc: "Lanza un fragmento explosivo que se adhiere al suelo y explota múltiples veces." },
            { name: "MEM/oria", desc: "Lanza una granada cegadora." },
            { name: "PUNTO/cero", desc: "Lanza un cuchillo que se adhiere a las superficies y suprime las habilidades enemigas." },
            { name: "NULL/cmd", desc: "ULTIMATE: Emite pulsos de energía que suprimen a los enemigos y permite ser revivido si cae." }
        ]
    },
    "Fade": {
        role: "Iniciador",
        description: "Fade, la cazarrecompensas turca, libera el poder de las pesadillas para apoderarse de los secretos enemigos.",
        abilities: [
            { name: "Capturar", desc: "Lanza un orbe que retiene a los enemigos en el lugar." },
            { name: "Atormentar", desc: "Lanza una entidad que revela a los enemigos." },
            { name: "Acechador", desc: "Envía una criatura que persigue a los enemigos y les reduce la visión." },
            { name: "Ocaso", desc: "ULTIMATE: Envía una ola de energía de pesadilla que atraviesa paredes, revela y ensordece a los enemigos." }
        ]
    },
    "Gekko": {
        role: "Iniciador",
        description: "Gekko, de Los Ángeles, lidera una pandilla de criaturas calamitosas.",
        abilities: [
            { name: "Mosh", desc: "Lanza a Mosh como una granada que se multiplica y explota en una zona amplia." },
            { name: "Wingman", desc: "Envía a Wingman a buscar enemigos y aturdirlos, o a plantar/desactivar la Spike." },
            { name: "Dizzy", desc: "Lanza a Dizzy al aire para cegar a los enemigos con plasma." },
            { name: "Thrash", desc: "ULTIMATE: Dirige a Thrash hacia los enemigos para explotar y detenerlos." }
        ]
    },
    "Tejo": {
        role: "Iniciador",
        description: "Tejo, un veterano de inteligencia colombiano, usa sistemas de guía balística para revelar y eliminar amenazas.",
        abilities: [
            { name: "Misil Rastreador", desc: "Dispara un misil que revela a los enemigos impactados." },
            { name: "Granada de Conmoción", desc: "Lanza una granada que aturde a los enemigos en el área." },
            { name: "Dron Táctico", desc: "Despliega un dron para marcar objetivos." },
            { name: "Ataque Aéreo", desc: "ULTIMATE: Solicita un bombardeo en una zona designada que inflige gran daño." }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Add click listeners to all agent list items
    const agentListItems = document.querySelectorAll('.agent-list li');
    const modal = document.getElementById('agent-modal');
    const closeModal = document.querySelector('.close-modal');

    // Modal elements to update
    const modalTitle = document.getElementById('modal-agent-name');
    const modalRole = document.getElementById('modal-agent-role');
    const modalDesc = document.getElementById('modal-agent-desc');
    const abilitiesList = document.getElementById('modal-abilities-list');

    agentListItems.forEach(item => {
        // Make items look clickable
        item.style.cursor = 'pointer';
        item.classList.add('agent-trigger');

        item.addEventListener('click', () => {
            const agentName = item.textContent.trim();
            const data = agentsData[agentName];

            if (data) {
                // Populate modal
                modalTitle.textContent = agentName;
                modalRole.textContent = data.role;
                modalDesc.textContent = data.description;

                // Clear previous abilities
                abilitiesList.innerHTML = '';

                // Add abilities
                data.abilities.forEach(ability => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${ability.name}:</strong> ${ability.desc}`;
                    abilitiesList.appendChild(li);
                });

                // Show modal
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                console.log('No data found for agent:', agentName);
            }
        });
    });

    // Close modal logic
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close on click outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
