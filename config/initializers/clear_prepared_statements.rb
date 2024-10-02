#
# Targets PostgreSQL adapters, ensures all prepared statements are cleared when ActiveRecord (db for Rails) loads a new connection from
# the connection pool. Tells PostgreSQL to deallocate all prepared statements for the current session.
# Ensures a clean development environment.
#
unless Rails.env.test?
  ActiveSupport.on_load(:active_record) do
    ActiveRecord::Base.connection_pool.with_connection do |conn|
      if conn.adapter_name == "PostgreSQL"
        conn.execute("DEALLOCATE ALL")
      end
    end
  end
end
