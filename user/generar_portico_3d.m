 
dx = [ 5.7 5.7 5.8 6.4 ];
dy = [ 3.4 3 3 3 3 3 ];
dz = [ 5.8 5.8 6 ];

inod = 1;

for niv = 1 : size(dy,2)
    for iz = 1 : size(dz,2)
        for ix = 1 : size(dx,2)
            %xyz(inod,:) = (dx(ix) dy(niv) dz(iz));
            fprintf('[ %d , %d , %d ],\n', dx(ix), dy(niv), dz(iz));
            inod = inod + 1;
        end
    end
end
