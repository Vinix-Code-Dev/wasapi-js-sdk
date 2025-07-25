export interface CreateContact {
    /**
     * Nombre del contacto
     * @required
     */
    first_name: string;
  
    /**
     * Apellido del contacto
     */
    last_name?: string;
  
    /**
     * Dirección de correo electrónico del contacto
     */
    email?: string;
  
    /**
     * Código de país del contacto
     */
    country_code?: string;
  
    /**
     * Número de teléfono del contacto
     * @required
     */
    phone: string;
  
    /**
     * Información adicional relevante sobre el contacto
     */
    notes?: string;
  
    /**
     * Estado de bloqueo del contacto
     * @default false
     */
    blocked?: boolean;
  
    /**
     * Estado de suscripción del contacto
     * @default false
     */
    unsubscribed?: boolean;
  
    /**
     * Lista de identificadores de etiquetas asociadas
     */
    labels?: number[];
  
    /**
     * Campos personalizados a asignar al contacto, donde la clave es el nombre del campo y el valor es el valor a asignar
     */
    custom_fields?: Record<string, any>;
  }
  