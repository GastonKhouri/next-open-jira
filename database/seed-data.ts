interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: Labore elit aute dolor proident et tempor aliqua consectetur.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'En-progreso: Lorem nulla ullamco anim aliqua.',
            status: 'in-progress',
            createdAt: Date.now()
        },
        {
            description: 'Finalizado: Nostrud et sit mollit minim amet tempor officia est ex dolore laborum pariatur.',
            status: 'finished',
            createdAt: Date.now()
        },
    ]
};