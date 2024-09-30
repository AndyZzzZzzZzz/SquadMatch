# config/initializers/clear_prepared_statements.rb

ActiveSupport.on_load(:active_record) do
    ActiveRecord::Base.connection_pool.with_connection do |conn|
      if conn.adapter_name == 'PostgreSQL'
        conn.execute("DEALLOCATE ALL")
      end
    end
  end
  